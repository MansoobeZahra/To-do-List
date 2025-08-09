import { TodoManager } from './classes/TodoManager.js';
import { ThemeSwitcher } from './classes/ThemeSwitcher.js';
import { UIManager } from './classes/UIManager.js';
import { ChartManager } from './modules/ChartManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const tm = new TodoManager();
  new ThemeSwitcher();
  new UIManager(tm).init();
  
});

const todoManager = new TodoManager();
const uiManager = new UIManager(todoManager);
const themeSwitcher = new ThemeSwitcher();
const chartManager = new ChartManager(todoManager);
// Load from localStorage
todoManager.loadTasks();
themeSwitcher.applySavedTheme();
uiManager.renderTasks();
uiManager.initEventListeners();
chartManager.initCharts();

// Re-render charts when tasks change
const originalRenderTasks = uiManager.renderTasks.bind(uiManager);
uiManager.renderTasks = () => {
  originalRenderTasks();
  chartManager.initCharts();
};


// Pie chart shows how many tasks per category.

// Bar chart shows how many daily habit tasks were tracked per day.