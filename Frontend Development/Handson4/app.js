import { courses } from "./data.js";

const courseGrid = document.querySelector(".course-grid");
const loading = document.querySelector("#loading");

const spinner = document.querySelector("#spinner");
const notificationList = document.querySelector("#notification-list");
const errorMessage = document.querySelector("#error-message");
const retryButton = document.querySelector("#retry-btn");

function renderCourses(courseList){

    courseGrid.innerHTML = "";

    courseList.forEach(course=>{

        const article = document.createElement("article");

        article.className = "course-card";

        article.innerHTML = `

            <h3>${course.name}</h3>

            <p>${course.code}</p>

            <span>${course.credits} Credits</span>

        `;

        courseGrid.appendChild(article);

    });

}

function fetchUser(id){

    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

    .then(response=>response.json())

    .then(user=>{

        console.log(user.name);

        return user;

    });

}

fetchUser(1);

async function fetchUserAsync(id){

    try{

        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

        const user = await response.json();

        console.log(user.name);

        return user;

    }

    catch(error){

        console.log(error);

    }

}

fetchUserAsync(2);

function fetchAllCourses(){

    return new Promise(resolve=>{

        setTimeout(()=>{

            resolve(courses);

        },1000);

    });

}

loading.style.display = "block";

fetchAllCourses()

.then(courseData=>{

    loading.style.display = "none";

    renderCourses(courseData);

});

Promise.all([

    fetchUser(1),

    fetchUser(2)

])

.then(users=>{

    console.log(users[0].name);

    console.log(users[1].name);

});

axios.interceptors.request.use(config=>{

    console.log(`API call started : ${config.url}`);

    return config;

});

async function apiFetch(url){

    const response = await axios.get(url);

    return response.data;

}

async function loadNotifications(){

    spinner.style.display = "block";

    notificationList.innerHTML = "";

    errorMessage.textContent = "";

    retryButton.style.display = "none";

    try{

        const posts = await apiFetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

        spinner.style.display = "none";

        posts.forEach(post=>{

            const card = document.createElement("div");

            card.className = "notification";

            card.innerHTML = `

                <h3>${post.title}</h3>

                <p>${post.body}</p>

            `;

            notificationList.appendChild(card);

        });

    }

    catch(error){

        spinner.style.display = "none";

        errorMessage.textContent = "Unable to load notifications.";

        retryButton.style.display = "inline-block";

    }

}

loadNotifications();

retryButton.addEventListener("click",()=>{

    loadNotifications();

});

axios.get(

    "https://jsonplaceholder.typicode.com/posts",

    {

        params:{

            userId:1

        }

    }

)

.then(response=>{

    console.log("Posts of User 1");

    console.log(response.data);

})

.catch(error=>{

    console.log(error);

});

async function simulateError(){

    try{

        await apiFetch("https://jsonplaceholder.typicode.com/nonexistent");

    }

    catch(error){

        console.log(error.message);

    }

}

simulateError();

