from flask import Flask

app=Flask(__name__)

@app.route("/")
def index():
    return "Hello\nThis is on Docker"

app.run(port=8080, host="0.0.0.0") # 0.0.0.0을 해야 로컬 호스트와 무관하게 접근 가능