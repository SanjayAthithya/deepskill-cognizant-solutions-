function CourseCard({name,code,credits,grade,onEnroll}){

return(
<article className="course-card">
<h2>{name}</h2>
<p>{code}</p>
<p>{credits} Credits</p>
<p>Grade : {grade}</p>
<button onClick={onEnroll}>Enroll</button>
</article>
);
}

export default CourseCard;