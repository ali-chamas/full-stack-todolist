//secured routing
const isLoggedIn = window.localStorage.getItem('loggedIn');

function checkLogin(){
    if(isLoggedIn==='false'){
        window.location.assign('/')
    }
}

checkLogin();

const logoutButton=document.getElementById('logout-btn');


logoutButton.addEventListener('click',function(){
    window.localStorage.setItem('loggedIn','false');
    window.location.reload()
})




let todoList=[];

const fetchedTodos=JSON.parse(window.localStorage.getItem('todoList'));

if(fetchedTodos){
    todoList=fetchedTodos;
}

let todosContainer=document.getElementById('todos-container');
let todosClass=document.querySelectorAll('.todos');

function reloadTodos(){
    todosContainer.innerHTML="";
    for(let i=0;i<todoList.length;i++){
        const todo = todoList[i];

        todosContainer.innerHTML+=`
                                    <div class="flex w-full justify-between todos ${todo.isComplete && 'completed'}">
                                        <p>${todo.task}</p>
                                        <div class="flex gap">
                                            <i class="fa-solid fa-trash danger-color  " onClick='deleteTodo(${i})'></i>
                                            <i class="fa-solid fa-circle-check green-color " onClick='completeTodo(${i})'></i>
                                        </div>

                                    </div>`
//select the added todos as well
todosClass=document.querySelectorAll('.todos');

    }
}

function setLocalstorage(){
    window.localStorage.setItem('todoList',JSON.stringify(todoList));
}



if(todoList.length>0){
    reloadTodos()
}


const todoInput=document.getElementById('todo-input');
const addButton=document.getElementById('add-button');



let todo='';

todoInput.addEventListener('change',function(e){
    todo=e.target.value;
})

addButton.addEventListener('click',function(){
    if(todo!==''){
 todoList.push({task:todo,isComplete:false});
    setLocalstorage()
    todoInput.value='';
    reloadTodos();
    
    }
   
})



function deleteTodo(index){
   todoList.splice(index,1)
   setLocalstorage();
   reloadTodos();
}



function completeTodo(index){
    todosClass[index].classList.toggle('completed');

    //toggle todo's completion
    todoList[index].isComplete=!todoList[index].isComplete;
    setLocalstorage();
    reloadTodos();
    
    
}