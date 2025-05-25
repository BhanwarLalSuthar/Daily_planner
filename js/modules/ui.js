import { addTask, deleteTask, toggleComplete } from './tasks.js';
import { debounce } from './utils.js';

const taskListEl = document.getElementById('tasks');
const addForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const searchInput = document.getElementById('search-input');

export function renderTasks(tasks) {
  taskListEl.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.className = task.completed ? 'completed' : '';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      toggleComplete(tasks, task.id);
      renderTasks(tasks);
    });

    const span = document.createElement('span');
    span.textContent = task.text;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
      deleteTask(tasks, task.id);
      renderTasks(tasks);
    });

    li.append(checkbox, span, delBtn);
    taskListEl.appendChild(li);
  });
}

export function bindEvents(tasks) {
  addForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!taskInput.value.trim()) return;
    addTask(tasks, taskInput.value.trim());
    taskInput.value = '';
    renderTasks(tasks);
  });

  searchInput.addEventListener('input', debounce(e => {
    const query = e.target.value.toLowerCase();
    const filtered = tasks.filter(t => t.text.toLowerCase().includes(query));
    renderTasks(filtered);
  }, 300));
}