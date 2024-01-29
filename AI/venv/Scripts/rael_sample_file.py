import cv2, os
import face_recognition as fr
from IPython.display import Image, display
from matplotlib import pyplot as plt
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

image_path = "/Anton.jpg"

image = fr.load_image_file(image_path) # 이미지 파일 가져오기
face_locations = fr.face_locations(image) # 이미지에서 얼굴의 위치를 찾음 -> 얼굴의 특정 위치를 나타내는 좌표 반환

for(top, right, bottom, left) in face_locations:
  # 이미지에서 얼굴의 위치를 찾아서 얼굴 주위에 사각형을 그림
  cv2.rectangle(image, (left, top), (right, bottom), (0,255,0), 3) 

#이미지 버퍼 출력
# 그려진 이미지는 plt에 의해 시각적으로 출력됨
plt.rcParams["figure.figsize"] = (16,16) # 그림의 크기 설정
plt.imshow(image) # 이미지를 시각적으로 표시
plt.show() # 그림을 화면에 표시

plt.rcParams["figure.figsize"] = (1,1) # 그림의 크기를 다시 1*1로 설정

#이미지 파일을 로드하여 known_person_list 리스트 생성
k_list = []
k_list.append(fr.load_image_file("/gdrive/My Drive/Colab Notebooks/doyeong1.jpeg"))
k_list.append(fr.load_image_file("/gdrive/My Drive/Colab Notebooks/jeno.jpeg"))
k_list.append(fr.load_image_file("/gdrive/My Drive/Colab Notebooks/mark.jpeg"))
k_list.append(fr.load_image_file("/gdrive/My Drive/Colab Notebooks/jaemin.jpeg"))

#얼굴 인식 후 감지된 부분 자르기
k_f_list = []
for person in k_list:
  #좌표 인식
  top, right, bottom, left = fr.face_locations(person)[0] # 각 인물의 이미지에서 얼굴의 위치를 찾
  face_image = person[top:bottom, left:right] # 해당 위치를 사용하여 얼굴을 자름

  #잘라낸 이미지 저장
  k_f_list.append(face_image)

#얼굴 출력
for face in k_f_list: # k_f_list에 저장된 인물의 얼굴 이미지를 순회
  plt.imshow(face) # 얼굴 이미지를 시각적으로 출력 
  plt.show() # 각 얼굴 이미지를 화면에 표시

  #### 검사 대상 이미지 업로드 !!!!!!!!
  unknown_person = fr.load_image_file("/gdrive/My Drive/Colab Notebooks/doyeong2.jpeg")

plt.imshow(unknown_person) # unknown_person에 저장된 이미지를 시각적으로 출력
plt.show() # 화면에 표시

top, right, bottom, left = fr.face_locations(unknown_person)[0] # 검사 대상 이미지에서 얼굴 위치 찾고
unknown_face = unknown_person[top:bottom, left:right] # 얼굴만 자르기

plt.title("unknown_face") # 잘린 얼굴 이미지 제목 설정
plt.imshow(unknown_face)
plt.show() # 시각적으로 출력

enc_u_f = fr.face_encodings(np.ascontiguousarray(unknown_face)) # 검사 대상 이미지의 얼굴 특징 벡터 추출

plt.imshow(enc_u_f)
plt.show() # 시각적으로 출력

for face in k_f_list:# face: 잘린 얼굴 이미지 데이터 배열
  enc_k_f = fr.face_encodings(np.ascontiguousarray(face)) # 얼굴 특징 벡터 추출
   # np.ascontiguousarray(face): 배열을 연속적인 형태로 만들 - 얼굴 이미지의 데이터를 numpy 배열로 변환하여 연속적인 메모리에 저장하여 얼굴 특징 벡터를 추출하는 과정에서의 성능 향상

  distance = fr.face_distance(enc_k_f, enc_u_f[0]) # 얼굴 이미지와의 거리 계산

  plt.title("distance: " + str(distance)) # distance를 제목으로 설정
  plt.imshow(face) # 각 인물의 얼굴 이미지를 시각적으로 출력
  plt.show() # 각 얼굴 이미지와 거리 정보를 함께 화면에 표시

# from flask import Flask
# app = Flask(__name__)

# @app.route('/')
# def home():
#    return 'This is Home!'

# if __name__ == '__main__':  
#    app.run('0.0.0.0',port=5000,debug=True)