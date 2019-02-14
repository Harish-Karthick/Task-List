//Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners

loadEventListeners();

function loadEventListeners() {
  //DOM Load Evvent
  document.addEventListener('DOMContentLoaded' , getTasks);

  //Add Task Event
  form.addEventListener('submit' , addTask);

  //Remove Task Event
  taskList.addEventListener('click' , removeTask);

  //Clear Task Event
  clearBtn.addEventListener('click',clearTasks);

  //Filter Task Event
  filter.addEventListener('keyup' , filterTasks);
}

//Get tasks from Local Storage
function getTasks () {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){

    const li = document.createElement('li');

    li.className = 'collection-item';

    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');

    link.className = 'delete-item secondary-content';

    link.innerHTML = '<i class="far fa-trash-alt"></i>';

    li.appendChild(link);

    taskList.appendChild(li);
  });
}

function addTask(e){

  //This is to throw an error if the user tries to add empty task

  if(taskInput.value === ''){
    alert('Add a Task');
  }

  //Create the li element to add to the html. 
  const li = document.createElement('li');

  //Add Class
  li.className = 'collection-item';

  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  //Create a new link element
  const link = document.createElement('a');

  //Add class
  link.className = 'delete-item secondary-content';

  //Add icon to the list
  link.innerHTML = '<i class="far fa-trash-alt"></i>';

  //Append the link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  //Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //Clear input
  taskInput.value = '';

  e.preventDefault();
}

//Data Persistence
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}


//Remove task From the list
function removeTask (e) {

  if (e.target.parentElement.classList.contains('delete-item')) {

    if (confirm('Are you Sure?')) {
      e.target.parentElement.parentElement.remove();

      //Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

}

//Remove task from local storage
function removeTaskFromLocalStorage(taskItem){
  tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.forEach(function(task, index){
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasks() {

  //Method 1
  //taskList.innerHTML = '';

  //Method 2
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //Inner HTML method is slower than While loop method
  clearTasksFromLocalStorage();
}

//Clear all tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter Tasks

function filterTasks (e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
