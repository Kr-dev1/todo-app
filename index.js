const inputBox = document.getElementById("input-box");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("to-doList");

let editToDo = null;

const addTodo = (e) => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("Input cannot be empty");
    return false;
  }

  if (addBtn.value === "Edit") {
    editToDo.target.previousElementSibling.innerHTML = inputText;
    inputBox.value = "";
    addBtn.value = "Add";
  } else {
    const li = document.createElement("li");
    const p = document.createElement("p");
    // creating p tag
    p.innerHTML = inputText;
    li.appendChild(p);
    todoList.appendChild(li);

    // creating edit button
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "editBtn");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);

    // creating delete button
    const dltBtn = document.createElement("button");
    dltBtn.classList.add("btn", "dltBtn");
    dltBtn.innerText = "Remove";
    li.appendChild(dltBtn);

    inputBox.value = "";

    saveLocalTodos(inputText);
  }
};

const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);
  }
  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editToDo = e;
  }
  deleteLocalTodos(e.target.parentElement);
};

const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      // creating p tag
      p.innerHTML = todo;
      li.appendChild(p);
      todoList.appendChild(li);

      // creating edit button
      const editBtn = document.createElement("button");
      editBtn.classList.add("btn", "editBtn");
      editBtn.innerText = "Edit";
      li.appendChild(editBtn);

      // creating delete button
      const dltBtn = document.createElement("button");
      dltBtn.classList.add("btn", "dltBtn");
      dltBtn.innerText = "Remove";
      li.appendChild(dltBtn);
    });
  }
};

// const deleteLocalTodos = (todo) => {
//   let todos;
//   if (localStorage.getItem("todos") === null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }
//   let todoText = todo.children[0].innerHTML;
//   let todoIndex = todos.indexOf(todoText)
//   todos.splice(todoIndex, 1);
//   localStorage.setItem("todos", JSON.stringify(todos))
// };

window.addEventListener("DOMContentLoaded", getLocalTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
