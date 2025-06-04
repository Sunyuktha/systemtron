const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;

    const span = document.createElement("span");
    span.innerText = task.text;
    span.addEventListener("click", () => toggleComplete(index));

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "🗑️";
    delBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

// Initial rendering
renderTasks();
