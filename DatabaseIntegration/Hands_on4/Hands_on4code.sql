EXPLAIN
SELECT s.first_name,s.last_name,c.course_name
FROM enrollments e
JOIN students s ON s.student_id=e.student_id
JOIN courses c ON c.course_id=e.course_id
WHERE s.enrollment_year=2022;

CREATE INDEX IF NOT EXISTS idx_students_enrollment_year
ON students(enrollment_year);

CREATE UNIQUE INDEX IF NOT EXISTS idx_enrollments_student_course
ON enrollments(student_id,course_id);

CREATE INDEX IF NOT EXISTS idx_courses_course_code
ON courses(course_code);

EXPLAIN
SELECT s.first_name,s.last_name,c.course_name
FROM enrollments e
JOIN students s ON s.student_id=e.student_id
JOIN courses c ON c.course_id=e.course_id
WHERE s.enrollment_year=2022;

CREATE INDEX IF NOT EXISTS idx_enrollments_null_grade
ON enrollments(student_id)
WHERE grade IS NULL;

SELECT indexname,indexdef
FROM pg_indexes
WHERE tablename='students';

SELECT indexname,indexdef
FROM pg_indexes
WHERE tablename='enrollments';

SELECT indexname,indexdef
FROM pg_indexes
WHERE tablename='courses';

-- N+1 demonstration (SQL portion)
SELECT * FROM enrollments;

SELECT student_id,first_name,last_name
FROM students
WHERE student_id=1;

SELECT student_id,first_name,last_name
FROM students
WHERE student_id=2;

SELECT student_id,first_name,last_name
FROM students
WHERE student_id=3;

-- Optimized JOIN
SELECT
e.enrollment_id,
s.first_name,
s.last_name,
c.course_name,
e.grade
FROM enrollments e
JOIN students s
ON e.student_id=s.student_id
JOIN courses c
ON e.course_id=c.course_id;

EXPLAIN ANALYZE
SELECT
e.enrollment_id,
s.first_name,
s.last_name,
c.course_name,
e.grade
FROM enrollments e
JOIN students s
ON e.student_id=s.student_id
JOIN courses c
ON e.course_id=c.course_id;
