import { loadTasks } from './modules/storage.js';
import { renderTasks, bindEvents } from './modules/ui.js';

const tasks = loadTasks();
renderTasks(tasks);
bindEvents(tasks);