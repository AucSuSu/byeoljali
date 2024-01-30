import face_recognition as fr
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image

# 프론트에서 받아올 이미지(확인할 이미지)
image_path = "./Anton.jpg" 

# image = fr.load_image_file(image_path) # 이미지 파일 가져오기
# face_locations = fr.face_locations(image) # 이미지에서 얼굴의 위치를 찾음 -> 얼굴의 특정 위치를 나타내는 좌표 반환

# plt.rcParams["figure.figsize"] = (1,1) # 그림의 크기를 다시 1*1로 설정

# 저장된 얼굴 사진 - S3에서 certificate_image를 가지고 와야한다!
certificate_image = fr.load_image_file("./certificate_anton.jpg")

#좌표 인식
top, right, bottom, left = fr.face_locations(certificate_image)[0] # 각 인물의 이미지에서 얼굴의 위치를 찾
certificate_image = certificate_image[top:bottom, left:right] # 해당 위치를 사용하여 얼굴을 자름

#### 검사 대상 이미지 업로드 !!!!!!!!
unknown_person = fr.load_image_file("./Anton.jpg")

top, right, bottom, left = fr.face_locations(unknown_person)[0] # 검사 대상 이미지에서 얼굴 위치 찾고
unknown_face = unknown_person[top:bottom, left:right] # 얼굴만 자르기

enc_u_f = fr.face_encodings(np.ascontiguousarray(unknown_face)) # 검사 대상 이미지의 얼굴 특징 벡터 추출

enc_k_f = fr.face_encodings(np.ascontiguousarray(certificate_image)) # 얼굴 특징 벡터 추출
# np.ascontiguousarray(face): 배열을 연속적인 형태로 만들 - 얼굴 이미지의 데이터를 numpy 배열로 변환하여 연속적인 메모리에 저장하여 얼굴 특징 벡터를 추출하는 과정에서의 성능 향상

distance = fr.face_distance(enc_k_f, enc_u_f[0]) # 얼굴 이미지와의 거리 계산

print(distance)