FROM python

COPY . /app
WORKDIR /app

RUN echo server will be running on 8080
RUN pip install flask

CMD ["python", "server.py"]
