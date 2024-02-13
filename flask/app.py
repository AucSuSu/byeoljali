from flask import Flask, render_template, request, jsonify
import face_recognition as fr
import matplotlib.pyplot as plt
import numpy as np
import base64
import io
from io import BytesIO
import os
import requests
import uuid
import time
import json
# 문자열 비교 (영수증, 팬싸인회 이름 비교)
from difflib import SequenceMatcher
# from flask_cors import CORS
from PIL import Image, ImageOps
from werkzeug.serving import run_simple

api_url = 'https://igq83o9rcc.apigw.ntruss.com/custom/v1/28107/eab1aa4e0a50a7fbaf9304aaaac1ba04a63c2600bbbd373b1334daa2120c0d76/document/receipt'
secret_key = 'c3lXZlpEbkFmZU5yYW1sbnZteEdzS0lLTU1yZm9BQ3U='
image_file = './data1.jpg' # server로 받은 영수증 이미지 
albumName = ""
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' # tensorflow의 로깅레벨 설정: error만 보이도록
app = Flask(__name__)
# CORS(app) # 웹 애플리케이션이 다른 도메인에서 호스팅된 API에 접근할 때 필요


## FE 에서 캡쳐된 사진? 받아오기 (./unknown_person.jpg에 저장하기)
@app.route('/flask/checksame', methods = ['POST'])
def upload_file():
    if request.method == 'POST': # POST로 들어온 요청만

        try:
            print("FE에서 FLASK로 헤더와 이미지 전송")
            # fanId 값을 http 헤더에서 추출
            token = request.headers.get('authorization')
            print("token: " +token)

            #웹에서 base64로 인코딩된 이미지 정보 가져오기
            one_data = request.files['image'].read()
            print(type(one_data))
            # _, one_data = request.files['image'].split(',')

            print("Success to get incoding image from user") # debugging
            print('incoding image:', one_data[:10]) # base64 코드 앞쪽 10자리만 확인

            ### 이미지 데이터 처리 코드
            imgdata = base64.b64decode(one_data) # 디코딩하여 byte 형태로 변환
            print("Success to decode base64 code") # debugging

            #byte형태의 이미지 데이터를 이미지로 변환: Pillow(PIL) 라이브러리를 사용해 이미지 오픈
            print("Success to get image data") # debugging
            photo = Image.open(io.BytesIO(one_data))
            if photo is not None :
                print("photo 잘 저장했습니다")

            photo.convert("RGB").save("unknown_person.jpg") # 이미지화된 이미지를 check_image_file.jpg로 저장한다

            # try:
            #     # photo.convert("RGB").save("unknown_person.jpg") # 이미지화된 이미지를 unknown_person.jpg로 저장한다
            #     photo.save("unknown_person.jpg") # 이미지화된 이미지를 unknown_person.jpg로 저장한다
            #     print("Image saved successfully.")
            # except Exception as e:
            #     print("Error saving image:", str(e))


            print("===============================================")
            print("BE에 헤더 전송 후 이미지 받아오기")

            url = 'http://i10e104.p.ssafy.io:8080/image' ## spring url으로 수정하기

            # headers
            headers = {
                'Authorization': token
            }

            # 외부 API로부터 데이터 수신할 때
            # : 지정된 url로 post 요청을 보냄
            response = requests.get(url, headers=headers).content
            base64_decoded = base64.b64decode(response)
            print(type(base64_decoded))
            # 받아온 이미지 데이터를 사용하여 Image.open 호출
            tmp = io.BytesIO(base64_decoded)
            print("tmp common")
            print(type(tmp))
            response_photo = Image.open(tmp)

            
            print("response_photo")
            if response_photo is not None:
                print("response_photo 잘 저장했습니다")


            print(type(response_photo)) 

            response_photo.save("certificate_image.jpg") # 이미지화된 이미지를 check_image_file.jpg로 저장한다



            print("===============================================")
            print("저장된 두 사진의 distance 판별 후 전송")

            distance = getDistance()
            
            # 결괏값 출력
            pred_value = False
            if (distance < 0.43): # 거리가 0.43보다 작을 경우 -> distance 기준 값 변경하기
                pred_value = True # 같은 사람으로 판별
            else: # 거리가 더 크면
                pred_value = False # 다른 사람으로 판별
            
            print("IS SAME PERSON? ",pred_value)
            pred_result = {'isSamePerson':pred_value}

            print(distance[0])
            # 본인인지 아닌지에 대한 결과값 json 형식으로 보내줌
            return jsonify(pred_result) 
            # return jsonify({"please":True})
        except Exception as e:
            
            print("exception in!")
            return jsonify({"success": False, "message": str(e)})

# 영수증 인증 받기 
@app.route('/flask/checkreceipt', methods = ['POST'])
def upload_receipt():
    if request.method == 'POST': # POST로 들어온 요청만
            result_count = 0; 
            #이미지 가져오기 
            image_file = request.files['image'].read()
            albumName = request.form.get("albumName")
            print(type(image_file))

            request_json = {
                'images': [
                    {
                        'format': 'jpg',
                        'name': 'demo'
                    }
                ],
                'requestId': str(uuid.uuid4()),
                'version': 'V2',
                'timestamp': int(round(time.time() * 1000)),
                'lang' :'ko'
            }

            payload = {'message': json.dumps(request_json).encode('UTF-8')}
            files = [
            ('file', image_file)
            ]
            headers = {
            'X-OCR-SECRET': secret_key
            }

            response = requests.request("POST", api_url, headers=headers, data = payload, files = files)


            # 문자열을 JSON으로 파싱
            parsed_data = json.loads(response.text.encode('utf8'))
            print(parsed_data)

            # 여기서 잡아라 ....
            # -> images가 없는 경우 여기서 바로 response 500 error 
             
            receipt_data = parsed_data.get("images")

            # 'images' 키가 존재하는지 여부를 확인하고 처리합니다.
            if receipt_data is None:
                # 'images' 키가 존재할 때의 처리를 여기에 작성합니다.
                response_data = {'boughtAlbum': 0, 'msg' : "NOT_AVAILABLE"}
                return jsonify(response_data), 900


            # subResults 추출
            sub_results = []
            for receipt in receipt_data:
                result = receipt.get("receipt", {}).get("result", {})
                sub_results.extend(result.get("subResults", []))

            #print(sub_results)

            data_list = []

            if sub_results is None or len(sub_results) == 0 :
                 # 'images' 키가 존재할 때의 처리를 여기에 작성합니다.
                response_data = {'boughtAlbum': 0, 'msg' : "NOT_AVAILABLE"}
                return jsonify(response_data), 900
            
            if sub_results[0]['items'] is None or len(sub_results[0]['items']) == 0 :
                 # 'images' 키가 존재할 때의 처리를 여기에 작성합니다.
                response_data = {'boughtAlbum': 0, 'msg' : "NOT_AVAILABLE"}
                return jsonify(response_data), 900
            
            # 아이템들을 data_list에 추가
            for item in sub_results[0]['items']:
                data_list.append({
                    'name' : item.get('name', {}).get('formatted', {}).get('value', 'N/A'),
                    'code': item.get('code', {}).get('text', 'N/A'),
                    'count': item.get('count', {}).get('formatted', {}).get('value', 'N/A'),
                    'price': item.get('price', {}).get('price', {}).get('formatted', {}).get('value', 'N/A'),
                    'unit_price': item.get('price', {}).get('unitPrice', {}).get('formatted', {}).get('value', 'N/A'),

                })

            # 데이터 리스트 출력 -> 항목 리스트 
            for data in data_list:
                # 받아온 팬싸인회 이름과 구매항목 앨범 이름 대조 
                # 같은게 있다면 개수를 return 해줌 -> 없으면 0 
                if SequenceMatcher(None, data['name'], albumName).ratio() > 0.2 : 
                    print(data['name'])
                    print(data['count'])
                    print(SequenceMatcher(None, data['name'], albumName).ratio())
                    result_count = data['count']
                print(data)


            print(result_count)
             # HTTP 응답 생성
            response_data = {'boughtAlbum': result_count, "msg" : "OK"}
            return jsonify(response_data), 200


        
def getDistance(): ## 거리를 가져오는 함수
    try:
        # 들어온 두 값을 비교하여 인코딩한다.

        # 저장된 얼굴 사진 - S3에서 certificate_image를 가지고 와야한다!
        certificate_image = fr.load_image_file("./certificate_image.jpg")
        #좌표 인식
        print("certificate_image print:")
        print(certificate_image)
        print("face_locations print:")
        print(fr.face_locations(certificate_image))
        top, right, bottom, left = fr.face_locations(certificate_image)[0] # 각 인물의 이미지에서 얼굴의 위치를 찾
        certificate_image = certificate_image[top:bottom, left:right] # 해당 위치를 사용하여 얼굴을 자름

        #### 검사 대상 이미지 업로드 !!!!!!!!
        unknown_person = fr.load_image_file("./unknown_person.jpg")  
        top, right, bottom, left = fr.face_locations(unknown_person)[0] # 검사 대상 이미지에서 얼굴 위치 찾고
        unknown_face = unknown_person[top:bottom, left:right] # 얼굴만 자르기
        enc_u_f = fr.face_encodings(np.ascontiguousarray(unknown_face)) # 검사 대상 이미지의 얼굴 특징 벡터 추출

        enc_k_f = fr.face_encodings(np.ascontiguousarray(certificate_image)) # 얼굴 특징 벡터 추출
        # np.ascontiguousarray(face): 배열을 연속적인 형태로 만들 - 얼굴 이미지의 데이터를 numpy 배열로 변환하여 연속적인 메모리에 저장하여 얼굴 특징 벡터를 추출하는 과정에서의 성능 향상


        distance = fr.face_distance(enc_k_f, enc_u_f[0]) # 얼굴 이미지와의 거리 계산

        print("distance: ", distance)

        return distance

    except Exception as e:
            
            print("Distance - exception in!")
            return jsonify({"success": False, "message": str(e)})




@app.route('/flask/makelife4cut', methods= ['POST'])
def makelife4cut():
    if request.method == 'POST': # POST로 들어온 요청만

        try:
            print("FE에서 FLASK로 헤더/이미지 4개/아티스트 팬싸인회id/멤버 팬싸인회 id 전송")
            # fanId 값을 http 헤더에서 추출
            token = request.headers.get('authorization')
            print("token: " +token)

            memberFansignId = request.form.get('memberFansignId')
            artistFansignId = request.form.get('artistFansignId')

            print(memberFansignId)
            print(artistFansignId)

            #웹에서 base64로 인코딩된 이미지 정보 가져오기
            file_list = []

            for i in range(1,5):
                image_key = 'image{}'.format(i)

                if image_key in request.files: # image_key로 프론트에서 request로 받아와야 함!!
                    image_data = request.files[image_key].read()
                    
                    print("Success to get incoding image from user") # debugging
                    print('incoding image:', image_data[:10]) # base64 코드 앞쪽 10자리만 확인

                    ### 이미지 데이터 처리 코드
                    imgdata = base64.b64decode(image_data) # 디코딩하여 byte 형태로 변환
                    print("Success to decode base64 code") # debugging

                    #byte형태의 이미지 데이터를 이미지로 변환: Pillow(PIL) 라이브러리를 사용해 이미지 오픈
                    print("Success to get image data") # debugging
                    photo = Image.open(io.BytesIO(image_data))
                    if photo is not None :
                        print("photo 잘 저장했습니다")

                    file_list.append(photo) # 4개의 이미지 데이터가 저장된다!

            x_min, y_min, y_size = calculateSize(file_list)

            # 사진 크기 조절 - 사진 크기를 맞춰준다
            file_list, y_size, x_min, y_min = resizeToMin(file_list, x_min, y_min, y_size) # return 받은 값을 이용해서 리사이즈

            # 조절한 사진들에 경계선 추가
            print("조절한 사진들에 경계선 추가")
            file_list, x_min, y_min, y_size = add_border(file_list, x_min, y_min, y_size)

            # 이미지 4개 붙이기
            print("이미지 4개 붙이기")
            life4cut = imageMerge(file_list, y_size, x_min, y_min)

            print("===============================================")
            print("BE로 헤더와 이미지 전송")

            print(type(life4cut))

            # PIL.Image.Image 객체를 바이트 데이터로 변환
            buffered = BytesIO()
            life4cut.save(buffered, format="JPEG")  # 이미지 포맷에 따라 format을 조정
            life4cut_bytes = buffered.getvalue()

            files = [('photo', ('life4cut.jpg', life4cut_bytes, 'image/jpeg'))]

            # Prepare data to send to the Spring application
            headers = {'Authorization': token}
            data = {
                'artistFansignId' : artistFansignId,
                'memberFansignId' : memberFansignId
            }
            print("byte 데이터로 전환 완료")

            # Send a POST request to the Spring application
            url = 'http://i10e104.p.ssafy.io:8080/api/myalbum'
            response = requests.request("POST", url, headers=headers, files=files, data=data)

            print("spring으로 post 요청 전송 완료")
            # Handle the response from the Spring application
            spring_response = response.json()
            return jsonify({"spring_response": spring_response})


        except Exception as e:
            print("exception in!")
            return jsonify({"success": False, "message": str(e)})

## 사진의 크기를 맞추는 함수
def calculateSize(file_list):
    size_x = [] # 사진들의 가로 길이 저장
    size_y = [] # 사진들의 세로 길이 저장

    for idx in range(len(file_list)):
        size_x.append(file_list[idx].size[0])
        size_y.append(file_list[idx].size[1])

    x_min = min(size_x)
    y_min = min(size_y)
    total_y_size = y_min * len(file_list)
    
    print("x_min : ", x_min)
    print("y_min : ", y_min)
    print("총길이 : ", total_y_size)

    return x_min, y_min, total_y_size

## 가장 작은 크기에 맞춰서 사진들의 크기 맞춰주기
def resizeToMin(file_list, x_min, y_min, y_size):
    for idx in range(len(file_list)):
        file_list[idx] = file_list[idx].resize((x_min, y_min))
        print(file_list[idx].size)

    return file_list, y_size, x_min, y_min

## 이미지 합치기
def imageMerge(file_list, y_size, x_min, y_min):
    
    # 이미지를 올려줄 도화지
    new_image = Image.new("RGB", (x_min, y_size), (256,256,256))
    print("가로 길이: ", x_min)
    print("세로 길이: ", y_size)
    print("사진 파일 개수: ", len(file_list))


    for idx in range(len(file_list)):
        # 시작점 가로, 시작점 세로, 이미지 가로 크기, 이미지 세로 크기
        area = (0, idx * y_min, x_min, (idx + 1) * y_min)
        new_image.paste(file_list[idx], area)

    # new_image.show()
    new_image.save('./life4cut.jpg', "JPEG")
    return new_image


def add_border(file_list,x_min, y_min, y_size):

    for idx in range(len(file_list)):
        # image = Image.open(file_list[idx])

        # 테두리 추가
        file_list[idx] = ImageOps.expand(file_list[idx], border=20, fill=(256,256,256))
        # file_list[idx].show()

    x_min += 40
    y_min += 40
    y_size = y_min*4
    
    return file_list, x_min, y_min, y_size

if __name__ == "__main__":
    SequenceMatcher(None, "굿모닝 우유 900ml", "서울 우유 리뉴얼 기념 팬싸인회").ratio()
    run_simple('0.0.0.0', 5000, app)
