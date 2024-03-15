const logoutButton = document.getElementById("logout-btn");

logoutButton.addEventListener("click", function () {
  window.location.reload();
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userID = urlParams.get("id");

const ApiURL = "http://localhost/todolist-full-stack/server";

let todoList = [];

const fetchTodos = async () => {
  try {
    const res = await fetch(`${ApiURL}/todos/getTodos.php?id=${userID}`);
    const data = await res.json();
    todoList = data.todos;
    reloadTodos();
  } catch (error) {
    console.log(error);
  }
};

const todosContainer = document.getElementById("todos-container");
const editPopup = document.getElementById("edit-popup");
const editInput = document.getElementById("edit-input");
const editBtn = document.getElementById("edit-submit");
const exitBtn = document.getElementById("exit-btn");

let todosClass = document.querySelectorAll(".todos");

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
    //select the added todos as well
    todosClass = document.querySelectorAll(".todos");
  }
}

const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");

let todoTitle = "";

todoInput.addEventListener("change", function (e) {
  todoTitle = e.target.value;
});

async function addTodo() {
  const todo = new FormData();
  todo.append("title", todoTitle);
  try {
    const res = await fetch(`${ApiURL}/todos/addTodo.php?id=${userID}`, {
      method: "POST",
      body: todo,
    });
    const data = await res.json();
    console.log(data);
    await fetchTodos();

    todoInput.value = "";
    todoTitle = "";
  } catch (error) {
    console.log(error);
  }
}

async function deleteTodo(id) {
  const res = await fetch(
    `http://localhost/todolist-full-stack/server/todos/deleteTodo.php?id=${id}`
  );
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

async function handleEdit() {}

function openEditPopup(id) {
  editPopup.classList.add("flex");
  editBtn.addEventListener("click", () => handleEdit(id));
}

function closeEditPopup() {
  editPopup.classList.remove("flex");
}

const app = async () => {
  await fetchTodos();

  addButton.addEventListener("click", addTodo);
  exitBtn.addEventListener("click", closeEditPopup);
};

app();
