function Header({siteName,enrolledCount}){
return(
<header>
<h1>{siteName}</h1>
<nav>
<ul>
<li>Home</li>
<li>Courses</li>
<li>Profile</li>
</ul>
</nav>
<p>Enrolled : {enrolledCount}</p>
</header>
);
}

export default Header;