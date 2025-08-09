export class UIManager {
  constructor(todoManager) {
    this.todoManager = todoManager;
    this.taskList = document.getElementById('taskList');
    this.taskInput = document.getElementById('taskInput');
    this.taskDate = document.getElementById('taskDate');
    this.taskCategory = document.getElementById('taskCategory');
    this.isHabit = document.getElementById('isHabit');
    this.addBtn = document.getElementById('addBtn');
    this.sortFilter = document.getElementById('sortFilter');
  }

  initEventListeners() {
    this.addBtn.addEventListener('click', () => this.handleAddTask());
    this.sortFilter.addEventListener('change', () => this.renderTasks());
  }

  handleAddTask() {
    const task = {
      title: this.taskInput.value.trim(),
      date: this.taskDate.value,
      category: this.taskCategory.value,
      completed: false,
      isHabit: this.isHabit.checked
    };

    if (!task.title || !task.date || !task.category) {
      alert('Please fill out all fields.');
      return;
    }

    this.todoManager.addTask(task);
    this.clearInputs();
    this.renderTasks();
  }

  clearInputs() {
    this.taskInput.value = '';
    this.taskDate.value = '';
    this.taskCategory.value = '';
    this.isHabit.checked = false;
  }

  renderTasks() {
    const filter = this.sortFilter.value;
    const tasks = this.todoManager.getFilteredTasks(filter);
    this.taskList.innerHTML = '';

    tasks.forEach((task, i) => {
      const div = document.createElement('div');
      div.className = `bg-base-100 p-4 border-l-4 shadow-md rounded-lg ${
        task.completed ? 'opacity-60' : ''
      }`;

      div.innerHTML = `
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-bold">${task.title}</h3>
            <p class="text-xs opacity-80">${task.date} • ${task.category}</p>
          </div>
          <div class="space-x-2">
            <button class="btn btn-xs btn-ghost text-success" data-complete="${i}"><i class='bx bx-check'></i></button>
            <button class="btn btn-xs btn-ghost text-error" data-delete="${i}"><i class='bx bx-trash'></i></button>
          </div>
        </div>
      `;

      div.querySelector(`[data-complete]`).addEventListener('click', () => {
        this.todoManager.toggleTaskCompletion(i);
        this.renderTasks();
      });

      div.querySelector(`[data-delete]`).addEventListener('click', () => {
        this.todoManager.deleteTask(i);
        this.renderTasks();
      });

      this.taskList.appendChild(div);
    });
  }
}
