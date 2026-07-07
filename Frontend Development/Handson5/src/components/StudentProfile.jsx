import {useState} from "react";

function StudentProfile(){

const[student,setStudent]=useState({
name:"",
email:"",
semester:""
});

function handleChange(event){

setStudent({
...student,
[event.target.name]:event.target.value
});

}

return(
<section>
<h2>Student Profile</h2>

<input
type="text"
name="name"
placeholder="Name"
value={student.name}
onChange={handleChange}
/>

<input
type="email"
name="email"
placeholder="Email"
value={student.email}
onChange={handleChange}
/>

<input
type="text"
name="semester"
placeholder="Semester"
value={student.semester}
onChange={handleChange}
/>
</section>
);

}

export default StudentProfile;