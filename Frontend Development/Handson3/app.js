import { courses } from "./data.js";

const grid = document.querySelector(".course-grid");

const totalCredits = document.querySelector("#total-credits");

const searchInput = document.querySelector("#search-courses");

const sortButton = document.querySelector("#sort-btn");

const selectedCourse = document.querySelector("#selected-course");

courses.forEach(({name,credits})=>{

    console.log(`${name} : ${credits} Credits`);

});

const formattedCourses = courses.map(course=>`${course.code} — ${course.name} (${course.credits} credits)`);

console.log(formattedCourses);

const filteredCourses = courses.filter(course=>course.credits>=4);

console.log(filteredCourses.length);

const total = courses.reduce((sum,course)=>sum+course.credits,0);

console.log(total);

let displayedCourses=[...courses];

function renderCourses(courseList){

    grid.innerHTML="";

    courseList.forEach(course=>{

        const article=document.createElement("article");

        article.className="course-card";

        article.dataset.id=course.id;

        article.innerHTML=`

            <h3>${course.name}</h3>

            <p>${course.code}</p>

            <span>${course.credits} Credits</span>

        `;

        grid.appendChild(article);

    });

    totalCredits.textContent=`Total Credits : ${courseList.reduce((sum,course)=>sum+course.credits,0)}`;

}

renderCourses(displayedCourses);

searchInput.addEventListener("input",()=>{

    const value=searchInput.value.toLowerCase();

    displayedCourses=courses.filter(course=>

        course.name.toLowerCase().includes(value)

    );

    renderCourses(displayedCourses);

});

sortButton.addEventListener("click",()=>{

    displayedCourses.sort((a,b)=>b.credits-a.credits);

    renderCourses(displayedCourses);

});

grid.addEventListener("click",(event)=>{

    const card=event.target.closest(".course-card");

    if(!card) return;

    const id=Number(card.dataset.id);

    const course=courses.find(course=>course.id===id);

    selectedCourse.textContent=`Selected Course : ${course.name} | Grade : ${course.grade}`;

});