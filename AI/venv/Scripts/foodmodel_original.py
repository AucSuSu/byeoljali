from flask import Flask                                            # python web framework 
from flask import render_template, redirect, url_for, request    # flask에서 필요한 모듈
from flask import jsonify                                        # import JSON을 해도되지만 여기서는 flask 내부에서 지원하는 jsonify를 사용
from keras.preprocessing import image
from keras import utils
import matplotlib.pyplot as plt
import numpy as np
import os
import io
import base64
from keras.models import load_model
from werkzeug.utils import secure_filename	
from flask_cors import CORS
from PIL import Image
from werkzeug.serving import run_simple

import foodmodel_module as fmm # 음식 종류를 담고 있는 json 파일과 AI 모델을 가지고 올 수 있는 모듈

food_dict = fmm.load_foodDict() # 음식 종류 json 파일을 딕셔너리로 가지고 온다
model = fmm.load_foodmodel() # 저장된 AI 모델을 가지고 온다

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' # tensorflow의 로깅레벨 설정: error만 보이도록
app = Flask(__name__)
CORS(app) # 웹 애플리케이션이 다른 도메인에서 호스팅된 API에 접근할 때 필요


@app.route("/sendFrame", methods=['POST']) 
def re():
    print(request.method) # 현재 요청의 http 메소드 출력: POST 요청이 맞는지 확인하는 디버깅 목적
    if request.method == 'POST': # POST 요청에 대해서만 처리를 진행
        
        #foodName = "None" # 음식 이름

        #안드로이드에서 'image'변수에 base64로 변환된 bitmap이미지
        one_data = request.form['image'] # POST 요청의 데이터 중 image라는 키의 값을 가져옴: 프론트에서 base64로 인코딩된 이미지

        #웹에서 base64로 인코딩된 이미지 정보 가져오기
        # _, one_data = request.form['image'].split(',') 
        print("Success to get incoding image from user") # debugging
        print('incoding image:', one_data[:10]) # base64 코드 앞쪽 10자리만 확인



        ### 이미지 데이터 처리 코드

        #base64로 인코딩된 이미지 데이터를 디코딩하여 byte형태로 변환
        imgdata = base64.b64decode(one_data)
        print("Success to decode base64 code") # debugging

        #byte형태의 이미지 데이터를 이미지로 변환: Pillow(PIL) 라이브러리를 사용해 이미지 오픈
        print("Success to get image data") # debugging
        photo = Image.open(io.BytesIO(imgdata))
        if photo is not None :
            foodName = "food"

        print(type(photo)) 
        photoArray = np.array(photo) # 이미지를 numpy 형식 배열로 만들어줌
        print(photoArray.shape) # shape를 사용하기 위해서
        
        #이미지 분석관련 코드 작성
        #foodNameData = {"foodName" : foodName}

        photo.save("food.jpg") # 이미지화된 이미지를 food.jpg로 저장한다

        print("===============================================")

        img_path = "food.jpg" # 이미지가 저장된 경로
        print("image path reload success")

        ### 이미지 전처리
        # images 의 img를 하나하나 크기 맞추기
        img_data = image.load_img(img_path, grayscale=False, color_mode='rgb', target_size=(fmm.img_height,fmm.img_width))
        img_data = image.img_to_array(img_data)
        print("image preprocess success")

        pred_value = fmm.predict_one_food(food_dict, model, img_data) # 음식을 분석하기

        # 분류한 음식 이름 출력
        print(pred_value)
        pred_result = {'food name':pred_value}

        # 결과값 json 형식으로 보내줌
        return jsonify(pred_result) 
        


if __name__ == "__main__":
    run_simple('0.0.0.0', 8000, app)