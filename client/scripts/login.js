//secured routing
const isLoggedIn = window.localStorage.getItem('loggedIn');

function checkLogin(){
    if(isLoggedIn==='true'){
        window.location.assign('/pages/todo.html')
    }
}

checkLogin()

const errorMessage=document.getElementById('error-message')

function displayError(){
    errorMessage.style.display='block'
}
function removeError(){
    errorMessage.style.display='none'
}

const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const loginButton = document.getElementById('login-button');

let username = "";
let password="";

usernameInput.addEventListener('change',function(e){
    username=e.target.value;
    removeError();
})

passwordInput.addEventListener('change',function(e){
    password=e.target.value;
    removeError();
})

console.log(username)

loginButton.addEventListener('click',function(){
    if(username==='AdminSEF123'&&password==='SeF@ctORy$$456'){
        window.localStorage.setItem('loggedIn','true');
        window.location.reload()
    }
    else{
        displayError()
    }
})