from flask import Flask, render_template, request, jsonify
# from werkzeug.utils import secure_filename
# from keras.preprocessing import image
# from keras import utils
# from keras.models import load_model
import face_recognition as fr
import matplotlib.pyplot as plt
import numpy as np
import base64
import io
import os
import requests
# from flask_cors import CORS
from PIL import Image
from requests_toolbelt import MultipartEncoder
from werkzeug.serving import run_simple
import boto3
from botocore.exceptions import NoCredentialsError

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' # tensorflow의 로깅레벨 설정: error만 보이도록
app = Flask(__name__)
# CORS(app) # 웹 애플리케이션이 다른 도메인에서 호스팅된 API에 접근할 때 필요

@app.route("/")
def hello_world():
    return render_template('html_sample.html')


## FE 에서 캡쳐된 사진? 받아오기 (./unknown_person.jpg에 저장하기)
@app.route('/checksame', methods = ['POST'])
def upload_file():
    if request.method == 'POST': # POST로 들어온 요청만

        try:
            print("FE에서 FLASK로 헤더와 이미지 전송")
            # fanId 값을 http 헤더에서 추출
            token = request.headers.get('authorization')
            print("header: " +token)

            #웹에서 base64로 인코딩된 이미지 정보 가져오기
            one_data = request.files['image'].read()
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

            photo.save("unknown_person.jpg") # 이미지화된 이미지를 check_image_file.jpg로 저장한다

            try:
                photo.convert("RGB").save("unknown_person.jpg") # 이미지화된 이미지를 unknown_person.jpg로 저장한다
                print("Image saved successfully.")
            except Exception as e:
                print("Error saving image:", str(e))


            print("===============================================")
            print("BE에 헤더 전송 후 이미지 받아오기")

            url = 'http://localhost:8080/image' ## spring url으로 수정하기

            # headers
            headers = {
                'Authorization': token
            }

            # param
            data = {}

            # 외부 API로부터 데이터 수신할 때
            # : 지정된 url로 post 요청을 보냄
            response = requests.get(url, headers=headers, data=data).content
            print(type(response))

            # 받아온 이미지 데이터를 사용하여 Image.open 호출
            tmp = io.BytesIO(response)
            print("tmp common")
            print(type(tmp))
            response_photo = Image.open(tmp)
            print("response_photo")
            if response_photo is not None:
                print("response_photo 잘 저장했습니다")


            print(type(response_photo)) 

            photo.save("certificate_image.jpg") # 이미지화된 이미지를 check_image_file.jpg로 저장한다



            print("===============================================")
            # print("저장된 두 사진의 distance 판별 후 전송")

            # distance = getDistance()
            # # 결괏값 출력
            # pred_value = False
            # if (distance < 0.6): # 거리가 0.6보다 작을 경우 -> distance 기준 값 변경하기
            #     pred_value = True # 같은 사람으로 판별
            # else: # 거리가 더 크면
            #     pred_value = False # 다른 사람으로 판별
            
            # print("IS SAME PERSON? ",pred_value)
            # pred_result = {'isSamePerson':pred_value}

            # 본인인지 아닌지에 대한 결과값 json 형식으로 보내줌
            # return jsonify(pred_result) 
            return jsonify({"please":True})
        except Exception as e:
            print("exception in!")
            return jsonify({"success": False, "message": str(e)})
        

        
def getDistance(): ## 거리를 가져오는 함수

    # 들어온 두 값을 비교하여 인코딩한다.

    # 저장된 얼굴 사진 - S3에서 certificate_image를 가지고 와야한다!
    certificate_image = fr.load_image_file("./certificate_image.jpg")

    #좌표 인식
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

    return distance



if __name__ == "__main__":
    run_simple('0.0.0.0', 8000, app)