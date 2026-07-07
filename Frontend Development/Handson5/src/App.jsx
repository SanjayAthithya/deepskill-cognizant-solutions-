import {useEffect,useState} from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CourseCard from "./components/CourseCard";
import StudentProfile from "./components/StudentProfile";

function App(){

const[courses,setCourses]=useState([]);
const[searchTerm,setSearchTerm]=useState("");
const[enrolledCourses,setEnrolledCourses]=useState([]);
const[loading,setLoading]=useState(true);
const[error,setError]=useState("");

useEffect(()=>{

fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
.then(response=>response.json())
.then(data=>{

const fetchedCourses=data.map(post=>({
id:post.id,
name:post.title,
code:`CS10${post.id}`,
credits:3+post.id%2,
grade:"A"
}));

setCourses(fetchedCourses);
setLoading(false);

})
.catch(()=>{

setError("Unable to load courses.");
setLoading(false);

});

},[]);

useEffect(()=>{

console.log("Courses updated");

// Dependency array ensures this effect runs only when the courses state changes.

},[courses]);

const filteredCourses=courses.filter(course=>
course.name.toLowerCase().includes(searchTerm.toLowerCase())
);

function handleEnroll(course){

if(!enrolledCourses.find(item=>item.id===course.id)){
setEnrolledCourses([...enrolledCourses,course]);
}

}

if(loading){

return(
<>
<Header siteName="Student Portal" enrolledCount={enrolledCourses.length}/>
<main>
<h2>Loading...</h2>
</main>
<Footer/>
</>
);

}

if(error){

return(
<>
<Header siteName="Student Portal" enrolledCount={enrolledCourses.length}/>
<main>
<h2>{error}</h2>
</main>
<Footer/>
</>
);

}

return(
<>
<Header siteName="Student Portal" enrolledCount={enrolledCourses.length}/>
<main>
<input
type="text"
placeholder="Search Courses..."
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
/>
<StudentProfile/>
{filteredCourses.map(course=>(
<CourseCard
key={course.id}
name={course.name}
code={course.code}
credits={course.credits}
grade={course.grade}
onEnroll={()=>handleEnroll(course)}
/>
))}
</main>
<Footer/>
</>
);

}

export default App;