# 모듈 import
import pymysql


# MySQL 데이터베이스 연결
db = pymysql.connect(host='testdb.chya8w8sy43m.ap-southeast-2.rds.amazonaws.com', user='admin', password='ssafy1234', db='sample', charset='utf8')

# 객체를 생성하여 쿼리를 실행할 수 있는 데이터에 접근할 수 있는 커서
cursor = db.cursor()

# SQL query 작성
fanId=1
sql = "select name, certification_image_url from fan where fan_id = " + fanId

# SQL query 실행
cursor.execute(sql)

# db 데이터 가져오기
result = cursor.fetchone() # 하나의 행만 가져오기
print("result: ",result)
for data in result:
    print("data: ",data)
# 수정 사항 db에 저장
db.commit()
 
# Database 닫기
db.close()