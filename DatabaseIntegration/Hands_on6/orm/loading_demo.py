from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, joinedload
from models import Student

USERNAME = "postgres"
PASSWORD = "pgs1234"
HOST = "localhost"
PORT = "5432"
DATABASE = "college_db_orm"

DATABASE_URL = f"postgresql+psycopg2://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"

engine = create_engine(DATABASE_URL, echo=True)

Session = sessionmaker(bind=engine)
session = Session()

students = session.query(Student).all()

for student in students:
    print(student.first_name, student.department.dept_name)

students = session.query(Student).options(
    joinedload(Student.department)
).all()

for student in students:
    print(student.first_name, student.department.dept_name)

session.close()