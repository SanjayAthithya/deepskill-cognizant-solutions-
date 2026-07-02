from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import date

from models import Department, Student, Professor, Course, Enrollment

USERNAME = "postgres"
PASSWORD = "pgs1234"
HOST = "localhost"
PORT = "5432"
DATABASE = "college_db_orm"

DATABASE_URL = f"postgresql+psycopg2://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"

engine = create_engine(DATABASE_URL, echo=True)

Session = sessionmaker(bind=engine)
session = Session()

try:

    dept = Department(
        department_id=1,
        dept_name="Computer Science",
        head_of_dept="Dr. Kumar"
    )

    student = Student(
        student_id=1,
        first_name="Sanjay",
        last_name="Athithya",
        email="sanjay@gmail.com",
        enrollment_year=2026,
        department=dept
    )

    professor = Professor(
        professor_id=1,
        prof_name="Dr. Kumar",
        email="kumar@college.edu",
        salary=90000,
        department=dept
    )

    course = Course(
        course_id=1,
        course_name="Database Systems",
        course_code="CS301",
        credits=4
    )

    enrollment = Enrollment(
        enrollment_id=1,
        student=student,
        course=course,
        enrollment_date=date.today(),
        grade="A"
    )

    session.add(dept)
    session.add(student)
    session.add(professor)
    session.add(course)
    session.add(enrollment)

    session.commit()

    print("\nData Inserted Successfully!\n")

except Exception as e:
    session.rollback()
    print(e)

students = session.query(Student).all()

for s in students:
    print(
        s.student_id,
        s.first_name,
        s.last_name,
        s.department.dept_name
    )

student = session.query(Student).filter_by(student_id=1).first()

if student:
    student.enrollment_year = 2027
    session.commit()

    print("Student Updated Successfully!")

enrollment = session.query(Enrollment).filter_by(enrollment_id=1).first()

if enrollment:
    session.delete(enrollment)
    session.commit()

    print("Enrollment Deleted Successfully!")

students = session.query(Student).all()

for s in students:
    print(
        s.student_id,
        s.first_name,
        s.last_name,
        s.enrollment_year
    )

session.close()

print("Session Closed Successfully!")