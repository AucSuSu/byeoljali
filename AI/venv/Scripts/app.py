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
# from flask_cors import CORS
from PIL import Image
from werkzeug.serving import run_simple
import boto3
from botocore.exceptions import NoCredentialsError

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' # tensorflow의 로깅레벨 설정: error만 보이도록
app = Flask(__name__)
# CORS(app) # 웹 애플리케이션이 다른 도메인에서 호스팅된 API에 접근할 때 필요


## FE 에서 캡쳐된 사진? 받아오기 (./unknown_person.jpg에 저장하기)
@app.route('/sendToFlask/fromFE', methods = ['POST'])
def upload_file():
    if request.method == 'POST': # POST로 들어온 요청만

        try:
            # fanId 값을 http 헤더에서 추출
            # fanId = request.headers.get('fanId')

            # POST 요청의 데이터 중 image라는 키의 값을 가지고 옴
            # 이 때 image 값은 base64로 인코딩 되어 있다
            # one_data= request.form['image'] 

            #웹에서 base64로 인코딩된 이미지 정보 가져오기
            _, one_data = request.form['image'].split(',')
            ## 두 줄 중 하나를 써야함 !!! 아마 밑 ? 몰라


            print("Success to get incoding image from user") # debugging
            print('incoding image:', one_data[:10]) # base64 코드 앞쪽 10자리만 확인

            ### 이미지 데이터 처리 코드
            imgdata = base64.b64decode(one_data) # 디코딩하여 byte 형태로 변환
            print("Success to decode base64 code") # debugging

            #byte형태의 이미지 데이터를 이미지로 변환: Pillow(PIL) 라이브러리를 사용해 이미지 오픈
            print("Success to get image data") # debugging
            photo = Image.open(io.BytesIO(imgdata))
            if photo is not None :
                print("photo 잘 저장했습니다")

            print(type(photo)) 
            # photoArray = np.array(photo) # 이미지를 numpy 형식 배열로 만들어줌
            # print(photoArray.shape) # shape를 사용하기 위해서

            photo.save("unknown_person.jpg") # 이미지화된 이미지를 check_image_file.jpg로 저장한다

            print("===============================================")

            # img_path = "unknown_person.jpg" # 이미지가 저장된 경로
            print("image path reload success")

            photo.show() # 받은 이미지 확인

            # return jsonify({"fanId": fanId,"success": True, "message": "Image processed successfully."})
            return jsonify({"success": True, "message": "Image processed successfully."})
        except Exception as e:
            # return jsonify({"fanId": fanId,"success": False, "message": str(e)})
            return jsonify({"success": False, "message": str(e)})



## S3에 fanId 전송하고 이미지 받아오기(./certificate_image.jpg에 저장) - 같은 폴더에 저장되는 이름만 다르면 되긴함
## 방법 1.
# @app.route('/sendToFlask/fromBE', methods = ['POST'])
# def getImageFromS3(fanId):
    if request.method == 'POST': # POST로 들어온 요청만

        try:
            ### fanId에 맞는 이미지를 받아오기!!!!
            # fanId에 해당하는 이미지를 S3에서 가져오기
            image_key = f"{fanId}.jpg"
            image_object = s3.get_object(Bucket=S3_BUCKET_NAME, Key=image_key)



            # POST 요청의 데이터 중 image라는 키의 값을 가지고 옴
            # 이 때 image 값은 base64로 인코딩 되어 있다
            one_data= request.form['image'] 

            #웹에서 base64로 인코딩된 이미지 정보 가져오기
            _, one_data = request.form['image'].split(',')
            ## 두 줄 중 하나를 써야함 !!! 아마 밑 ? 몰라


            print("Success to get incoding image from user") # debugging
            print('incoding image:', one_data[:10]) # base64 코드 앞쪽 10자리만 확인

            ### 이미지 데이터 처리 코드
            imgdata = base64.b64decode(one_data) # 디코딩하여 byte 형태로 변환
            print("Success to decode base64 code") # debugging

            #byte형태의 이미지 데이터를 이미지로 변환: Pillow(PIL) 라이브러리를 사용해 이미지 오픈
            print("Success to get image data") # debugging
            photo = Image.open(io.BytesIO(imgdata))
            if photo is not None :
                print("photo 잘 저장했습니다")

            print(type(photo)) 
            # photoArray = np.array(photo) # 이미지를 numpy 형식 배열로 만들어줌
            # print(photoArray.shape) # shape를 사용하기 위해서

            photo.save("certificate_image.jpg") # 이미지화된 이미지를 check_image_file.jpg로 저장한다

            print("===============================================")

            img_path = "certificate_image.jpg" # 이미지가 저장된 경로
            print("image path reload success")

            return jsonify({"success": True, "message": "Image processed successfully."})
        except Exception as e:
            return jsonify({"success": False, "message": str(e)})

    
## 방법 2. boto3 사용 - 더 알아봐야 할듯????
# AWS S3 설정
# AWS_ACCESS_KEY_ID = 'your_access_key_id'
# AWS_SECRET_ACCESS_KEY = 'your_secret_access_key'
# AWS_REGION = 'your_region'
# S3_BUCKET_NAME = 'your_bucket_name'

# s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY, region_name=AWS_REGION)

# @app.route('/getFromS3/<fanId>', methods=['GET'])
# def getImageFromS3(fanId):
    try:
        # fanId에 해당하는 이미지를 S3에서 가져오기
        # image_key = f"{fanId}.jpg"
        image_object = s3.get_object(Bucket=S3_BUCKET_NAME, Key=image_key)

        # 이미지 데이터를 Flask 응답으로 반환
        return jsonify({"success": True, "message": "Image retrieved from S3", "image": image_object['Body'].read().decode('utf-8')})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

        

## 본인인지 확인하는 메서드 - FE에 결괏값 전송
# @app.route('/checkIfSame', methods = ['GET'])
# def checkIfSame():

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

    # 결괏값 출력
    pred_value = False
    if (distance < 0.6): # 거리가 0.6보다 작을 경우가
        pred_value = True # 같은 사람으로 판별
    else: # 거리가 더 크면
        pred_value = False # 다른 사람으로 판별
    
    print("IS SAME PERSON? ",pred_value)
    pred_result = {'isSamePerson':pred_value}

    # 본인인지 아닌지에 대한 결과값 json 형식으로 보내줌
    return jsonify(pred_result) 




## 실행시키는 거
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=8080)

if __name__ == "__main__":
    run_simple('0.0.0.0', 8000, app)