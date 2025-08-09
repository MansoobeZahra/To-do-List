export class ThemeSwitcher {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(this.currentTheme);
    this.addListeners();
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  addListeners() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }
}
