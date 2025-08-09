export class ChartManager {
  constructor(todoManager) {
    this.todoManager = todoManager;
    this.pieChart = null;
    this.barChart = null;
  }

  initCharts() {
    this.renderPieChart();
    this.renderBarChart();
  }

  renderPieChart() {
    const ctx = document.getElementById('pieChart').getContext('2d');

    const categoryCounts = {
      Work: 0,
      Personal: 0,
      Urgent: 0,
      Other: 0
    };

    this.todoManager.tasks.forEach(task => {
      if (categoryCounts[task.category] !== undefined) {
        categoryCounts[task.category]++;
      }
    });

    const data = {
      labels: Object.keys(categoryCounts),
      datasets: [{
        label: 'Task Category Distribution',
        data: Object.values(categoryCounts),
        backgroundColor: ['#f87171', '#60a5fa', '#facc15', '#a78bfa']
      }]
    };

    if (this.pieChart) this.pieChart.destroy();
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data,
      options: { responsive: true, animation: { animateScale: true } }
    });
  }

  renderBarChart() {
    const ctx = document.getElementById('barChart').getContext('2d');

    const habitDates = {};
    this.todoManager.tasks.forEach(task => {
      if (task.isHabit) {
        const date = task.date;
        if (!habitDates[date]) habitDates[date] = 0;
        habitDates[date]++;
      }
    });

    const sortedDates = Object.keys(habitDates).sort();
    const data = {
      labels: sortedDates,
      datasets: [{
        label: 'Habits Tracked Per Day',
        data: sortedDates.map(d => habitDates[d]),
        backgroundColor: '#fda4af'
      }]
    };

    if (this.barChart) this.barChart.destroy();
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data,
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
