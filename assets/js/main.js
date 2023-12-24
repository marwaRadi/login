const userName = localStorage.getItem("userName");
console.log(userName);
let heading = document.querySelector("#header");
heading.innerHTML = ` welcome home ${userName}`