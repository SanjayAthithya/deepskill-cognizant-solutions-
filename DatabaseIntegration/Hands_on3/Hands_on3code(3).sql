CREATE OR REPLACE FUNCTION fn_enroll_student(
p_student_id INT,
p_course_id INT,
p_enrollment_date DATE)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
IF EXISTS(
SELECT 1 FROM enrollments
WHERE student_id=p_student_id
AND course_id=p_course_id) THEN
RETURN 'Duplicate Enrollment!';
END IF;

INSERT INTO enrollments(student_id,course_id,enrollment_date)
VALUES(p_student_id,p_course_id,p_enrollment_date);

RETURN 'Enrollment Successful';
END;
$$;

CREATE TABLE IF NOT EXISTS department_transfer_log(
log_id SERIAL PRIMARY KEY,
student_id INT,
old_department INT,
new_department INT,
transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

CREATE OR REPLACE FUNCTION fn_transfer_student(
p_student_id INT,
p_new_department INT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE old_dept INT;
BEGIN
SELECT department_id INTO old_dept
FROM students
WHERE student_id=p_student_id;

UPDATE students
SET department_id=p_new_department
WHERE student_id=p_student_id;

INSERT INTO department_transfer_log(student_id,old_department,new_department)
VALUES(p_student_id,old_dept,p_new_department);

RETURN 'Transfer Successful';
END;
$$;

BEGIN;
UPDATE students SET enrollment_year=2024 WHERE student_id=2;
COMMIT;

BEGIN;
UPDATE students SET enrollment_year=2020 WHERE student_id=2;
ROLLBACK;

BEGIN;
INSERT INTO enrollments(student_id,course_id,enrollment_date,grade)
VALUES(2,3,CURRENT_DATE,'A');
SAVEPOINT sp1;
UPDATE students SET enrollment_year=2025 WHERE student_id=2;
ROLLBACK TO SAVEPOINT sp1;
COMMIT;