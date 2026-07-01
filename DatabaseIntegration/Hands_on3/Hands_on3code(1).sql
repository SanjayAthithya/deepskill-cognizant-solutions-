SELECT s.student_id,s.first_name,s.last_name
FROM students s
JOIN enrollments e ON s.student_id=e.student_id
GROUP BY s.student_id,s.first_name,s.last_name
HAVING COUNT(e.course_id)>(
SELECT AVG(course_count)
FROM(
SELECT COUNT(course_id) AS course_count
FROM enrollments
GROUP BY student_id
)t);

SELECT c.course_name,c.course_code
FROM courses c
WHERE NOT EXISTS(
SELECT 1
FROM enrollments e
WHERE e.course_id=c.course_id
AND e.grade<>'A');

SELECT p.prof_name,p.department_id,p.salary
FROM professors p
WHERE salary=(
SELECT MAX(salary)
FROM professors p2
WHERE p2.department_id=p.department_id);

SELECT *
FROM(
SELECT department_id,AVG(salary) AS average_salary
FROM professors
GROUP BY department_id
)d
WHERE average_salary>85000;