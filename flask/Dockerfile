# Python 공식 이미지를 베이스 이미지로 사용
FROM python:3.9-slim

# 작업 디렉토리 설정
WORKDIR /app

# 현재 디렉토리의 내용을 컨테이너의 /app에 복사
COPY . /app

# 필요한 패키지 설치를 위한 requirements.txt 파일을 컨테이너에 복사
COPY requirements.txt /app/

RUN apt-get update && \
    apt-get install -y \
    build-essential \
    cmake \
    libopenblas-dev \
    liblapack-dev \
    libx11-dev \
    libgtk-3-dev \
    python3-dev \
    python3-pip \
    python3-numpy \
    && rm -rf /var/lib/apt/lists/*

# requirements.txt에 명시된 필요한 패키지들을 설치
RUN pip install -r requirements.txt

# Flask 애플리케이션 실행을 위한 환경변수 설정
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# 애플리케이션을 실행하기 위한 포트 설정 (Flask 기본 포트: 5000)
EXPOSE 5000

# Flask 애플리케이션 실행 명령어
CMD ["flask", "run"]
