const signUp = document.querySelector("#sign_up");
const login = document.querySelector("#login");

signUp.addEventListener("click",()=>{
    window.location.href=`/signup`;
});

login.addEventListener("click",()=>{
    window.location.href=`/login`;
});