import tensorflow as tf

from tensorflow import keras
from keras.models import Model, load_model

import numpy as np
import json
from PIL import Image

global foodjson_path, foodmodel_path
global img_width, img_height

foodjson_path = './food_classes.json' # 음식 종류가 저장된 json 파일
foodmodel_path = './foodmodel.h5'    # 모델 파일(h5 파일)

img_width = 224
img_height = 224

######### 전역 변수 설정 함수 ###########

### 음식 종류 json 파일 경로 설정 ###
def set_json_path(path) :
    foodjson_path = path

### h5 모델 파일 경로 설정 ###
def set_model_path(path) :
    foodmodel_path = path


######### 파일 load 관련 함수 ###########
## 여기가 달라져야함 !! 나는 DB에 있는 값을 가지고 와야하니까 .. 근데 이걸 어캐하지 ??
### 음식 종류 json 파일 딕셔너리로 가져오기
# Input : json 파일 경로 (파일명 및 확장자 포함)
# Output : 음식 종류 딕셔너리 - {indx : 음식 이름} 형식
def load_foodDict() :
    with open(foodjson_path, "r", encoding="utf-8") as json_file:
        foodDict = json.load(json_file)
    return foodDict # {str : str}


### 저장된 모델 가져오기 ###
# Input : model_path에 모델이 저장되어있는 경로 (ex. ~/Models/model.h5) 
# Output : keras.models 모델 메모리에 저장
def load_foodmodel() :
    model = load_model(foodmodel_path)
    return model


######### 모델 예측 관련 함수 ###########

### 모델 예측 결과 ###
# Pre : 모델 및 음식 분류 json 파일 load 필요
# Input : 클래스 분류 json 파일, 저장된 모델, 음식 이미지
# Output : 음식 종류 이름
def predict_one_food(foodDict, model, foodImage) :
    foodImage = np.expand_dims(foodImage, axis=0) # 입력 레이어 형식 맞춤
    foodImage = foodImage / 255. # 이미지 데이터 정규화
    foodIdx = np.argmax(model.predict(foodImage), axis=1) # 예측 -> index
    foodName = foodDict[str(foodIdx[0])] # index -> 음식 이름
    return foodName