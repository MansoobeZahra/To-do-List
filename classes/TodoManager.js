export class TodoManager {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    this.saveTasks();
  }

  updateTask(index, updatedTask) {
    this.tasks[index] = updatedTask;
    this.saveTasks();
  }

  toggleTaskCompletion(index) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const stored = localStorage.getItem('tasks');
    this.tasks = stored ? JSON.parse(stored) : [];
  }

  getFilteredTasks(filter) {
    if (filter === 'completed') return this.tasks.filter(t => t.completed);
    if (filter === 'pending') return this.tasks.filter(t => !t.completed);
    if (filter === 'habit') return this.tasks.filter(t => t.isHabit);
    return this.tasks;
  }
}
