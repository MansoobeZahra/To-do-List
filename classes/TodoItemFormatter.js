export class TodoItemFormatter {
  static CATEGORY_COLORS = {
    Work: 'bg-blue-200 text-blue-800',
    Personal: 'bg-green-200 text-green-800',
    Urgent: 'bg-red-200 text-red-800',
    Other: 'bg-yellow-200 text-yellow-800',
  };

  static create(todo, onToggle, onDelete, onEdit) {
    const card = document.createElement('div');
    card.className = `flex items-center justify-between p-4 rounded-lg shadow transition-all ${
      todo.completed ? 'opacity-50 line-through' : 'bg-base-200'
    }`;

    const main = document.createElement('div');
    main.innerHTML = `
      <div class="font-semibold">${todo.text}</div>
      <div class="text-sm opacity-70">${todo.date || 'No due date'}</div>
    `;

    if (todo.category) {
      const tag = document.createElement('span');
      tag.className = `category-tag ${this.CATEGORY_COLORS[todo.category] || this.CATEGORY_COLORS.Other}`;
      tag.textContent = todo.category;
      main.appendChild(tag);
    }

    if (todo.isHabit) {
      const tag = document.createElement('span');
      tag.className = `ml-2 badge badge-info`;
      tag.textContent = `Habit (🔥 ${todo.streak})`;
      main.appendChild(tag);
    }

    const btns = document.createElement('div');
    btns.className = 'flex gap-2';
    ['edit','toggle','delete'].forEach(type => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-sm btn-ghost';
      btn.innerHTML = {
        edit: "<i class='bx bx-edit'></i>",
        toggle: todo.completed ? "<i class='bx bx-undo'></i>" : "<i class='bx bx-check'></i>",
        delete: "<i class='bx bx-trash'></i>"
      }[type];
      btn.onclick = { edit: () => onEdit(todo), toggle: () => onToggle(todo.id), delete: () => onDelete(todo.id) }[type];
      btns.append(btn);
    });

    card.append(main, btns);
    return card;
  }
}
