CREATE TABLE IF NOT EXISTS departments (
    department_id SERIAL PRIMARY KEY,
    hod_name VARCHAR(100),
    dept_name VARCHAR(100) NOT NULL,
    budget DECIMAL(12,2)
);

CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    date_of_birth DATE,
    department_id INT,
    enrollment_year INT,
    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);

CREATE TABLE IF NOT EXISTS courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(150) NOT NULL,
    course_code VARCHAR(20) UNIQUE,
    credits INT,
    department_id INT,
    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);

CREATE TABLE IF NOT EXISTS enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    grade CHAR(2),
    FOREIGN KEY (student_id)
        REFERENCES students(student_id),
    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
);

CREATE TABLE IF NOT EXISTS professors (
    professor_id SERIAL PRIMARY KEY,
    prof_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department_id INT,
    salary DECIMAL(10,2),
    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);

SELECT table_name
FROM information_schema.tables
WHERE table_schema='public';

ALTER TABLE students
ADD COLUMN IF NOT EXISTS phone_number VARCHAR(15);

ALTER TABLE courses
ADD COLUMN IF NOT EXISTS max_seats INT DEFAULT 60;

DO $$
BEGIN
IF NOT EXISTS (
SELECT 1
FROM pg_constraint
WHERE conname='chk_grade'
) THEN

ALTER TABLE enrollments
ADD CONSTRAINT chk_grade
CHECK (grade IN ('A','B','C','D','F') OR grade IS NULL);

END IF;
END $$;

DO $$
BEGIN
IF EXISTS (
SELECT 1
FROM information_schema.columns
WHERE table_name='departments'
AND column_name='hod_name'
) THEN

ALTER TABLE departments
RENAME COLUMN hod_name TO head_of_dept;

END IF;
END $$;

ALTER TABLE students
DROP COLUMN IF EXISTS phone_number;

SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name='students';

SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name='courses';

SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name='departments';