const logoutButton = document.getElementById("logout-btn");
const session = window.localStorage.getItem("session") ?? null;
const todosContainer = document.getElementById("todos-container");
const editPopup = document.getElementById("edit-popup");
const editInput = document.getElementById("edit-input");
const editBtn = document.getElementById("edit-submit");
const exitBtn = document.getElementById("exit-btn");
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const scoreSpan = document.getElementById("user-score");

if (!session || session == "null") {
  window.location.assign("../index.html");
}
logoutButton.addEventListener("click", function () {
  window.localStorage.setItem("session", null);
  window.location.assign("../index.html");
});

const ApiURL = "http://localhost/todolist-full-stack/server";

let todoList = [];
let selectedID = "";
let userID = JSON.parse(session);
let user = {};
let todoTitle = "";
let editValue = "";

const fetchUser = async () => {
  try {
    const res = await fetch(`${ApiURL}/users/getUser.php?id=${userID}`);
    const data = await res.json();
    user = data;
    scoreSpan.innerHTML = user.score;
  } catch (error) {
    console.log(error);
  }
};
const fetchTodos = async () => {
  try {
    const res = await fetch(`${ApiURL}/todos/getTodos.php?id=${userID}`);
    const data = await res.json();
    todoList = data.todos;
    await fetchUser();
    reloadTodos();
  } catch (error) {
    console.log(error);
  }
};

function reloadTodos() {
  todosContainer.innerHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    const todo = todoList[i];

    todosContainer.innerHTML += `
    <div class="flex w-full justify-between todos ${
      todo.isFinished && "completed"
    }">
                                        <p>${todo.title}</p>
                                        <div class="flex gap">
                                         <i class="fa-solid fa-edit primary-color  " onClick='openEditPopup(${
                                           todo.id
                                         })'></i>
                                            <i class="fa-solid fa-trash danger-color  " onClick='deleteTodo(${
                                              todo.id
                                            })'></i>
                                            <i class="fa-solid fa-circle-check green-color " onClick=${
                                              todo.isFinished
                                                ? `incompleteTodo(${todo.id})`
                                                : `completeTodo(${todo.id})`
                                            }></i>
                                        </div>

                                    </div>`;
  }
}

async function addTodo() {
  const todo = new FormData();
  todo.append("title", todoTitle);
  try {
    const res = await fetch(`${ApiURL}/todos/addTodo.php?id=${userID}`, {
      method: "POST",
      body: todo,
    });
    const data = await res.json();

    await fetchTodos();

    todoInput.value = "";
    todoTitle = "";
  } catch (error) {
    console.log(error);
  }
}

async function deleteTodo(id) {
  const res = await fetch(`${ApiURL}/todos/deleteTodo.php?id=${id}`);
  await fetchTodos();
}

async function completeTodo(id) {
  try {
    const res = await fetch(
      `${ApiURL}/todos/completeTodo.php?id=${id}&userID=${userID}`,
      { method: "PUT" }
    );
    console.log(await res.json());
    await fetchTodos();
  } catch (error) {
    console.log(error);
  }
}
async function incompleteTodo(id) {
  try {
    const res = await fetch(
      `${ApiURL}/todos/incompleteTodo.php?id=${id}&userID=${userID}`,
      { method: "PUT" }
    );
    console.log(await res.json());
    await fetchTodos();
  } catch (error) {
    console.log(error);
  }
}

async function handleEdit(id) {
  const newTodo = new FormData();
  newTodo.append("title", editValue);

  try {
    const res = await fetch(`${ApiURL}/todos/editTodo.php?id=${id}`, {
      method: "POST",
      body: newTodo,
    });
    console.log(await res.json());
    editValue = "";
    selectedID = "";
    editInput.value = "";
    await fetchTodos();
  } catch (error) {
    console.log(error);
  }
}

function openEditPopup(id) {
  console.log(id);
  selectedID = id;
  editPopup.classList.add("flex");
  editInput.addEventListener("change", (e) => {
    editValue = e.target.value;
  });
}

function closeEditPopup() {
  editPopup.classList.remove("flex");
}

const app = async () => {
  await fetchTodos();

  todoInput.addEventListener("change", function (e) {
    todoTitle = e.target.value;
  });
  addButton.addEventListener("click", addTodo);

  editBtn.addEventListener("click", () => handleEdit(selectedID));

  exitBtn.addEventListener("click", closeEditPopup);
};

app();
