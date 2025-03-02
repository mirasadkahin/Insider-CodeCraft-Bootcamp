const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const filterCompletedBtn = document.getElementById('filter-completed');
const sortPriorityBtn = document.getElementById('sort-priority');


let tasks = [];
let showOnlyCompleted = false;
let sortByPriority = false;


taskForm.addEventListener('submit', addTask);
filterCompletedBtn.addEventListener('click', toggleCompletedFilter);
sortPriorityBtn.addEventListener('click', togglePrioritySort);
taskList.addEventListener('click', handleTaskAction);


function addTask(e) {
  e.preventDefault();
  
  try {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const priorityRadio = document.querySelector('input[name="priority"]:checked');
    
    if (!title) {
      showError('Başlık alanı zorunludur!');
      return;
    }
    
    if (!priorityRadio) {
      showError('Lütfen bir öncelik seçiniz!');
      return;
    }
    
    const priority = priorityRadio.value;
    
    hideError();
    
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      completed: false
    };
    
    tasks.push(newTask);
    
    taskForm.reset();

    renderTasks();
    
  } catch (err) {
    console.error('Görev eklenirken bir hata oluştu:', err);
    showError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
  }
}

function showError(message) {
  errorText.textContent = message;
  errorMessage.classList.remove('hidden');
}

function hideError() {
  errorMessage.classList.add('hidden');
}

function handleTaskAction(e) {
  const target = e.target;
  
  if (target.closest('.complete-btn')) {
    e.stopPropagation();
    const taskItem = target.closest('.task-item');
    toggleTaskCompletion(taskItem.dataset.id);
  }
  
  if (target.closest('.delete-btn')) {
    e.stopPropagation();
    const taskItem = target.closest('.task-item');
    deleteTask(taskItem.dataset.id);
  }
}

function toggleTaskCompletion(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function toggleCompletedFilter() {
  showOnlyCompleted = !showOnlyCompleted;
  filterCompletedBtn.classList.toggle('active-filter', showOnlyCompleted);
  filterCompletedBtn.textContent = showOnlyCompleted 
    ? 'Tüm Görevleri Göster' 
    : 'Sadece Tamamlananları Göster';
  
  const filterIcon = document.createElement('svg');
  filterIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  filterIcon.setAttribute('width', '16');
  filterIcon.setAttribute('height', '16');
  filterIcon.setAttribute('viewBox', '0 0 24 24');
  filterIcon.setAttribute('fill', 'none');
  filterIcon.setAttribute('stroke', 'currentColor');
  filterIcon.setAttribute('stroke-width', '2');
  filterIcon.setAttribute('stroke-linecap', 'round');
  filterIcon.setAttribute('stroke-linejoin', 'round');
  filterIcon.classList.add('filter-icon');
  filterIcon.innerHTML = '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>';
  
  filterCompletedBtn.prepend(filterIcon);
  renderTasks();
}

function togglePrioritySort() {
  sortByPriority = !sortByPriority;
  sortPriorityBtn.classList.toggle('active-sort', sortByPriority);
  sortPriorityBtn.textContent = sortByPriority 
    ? 'Sıralamayı Kaldır' 
    : 'Önceliğe Göre Sırala';
  
  const sortIcon = document.createElement('svg');
  sortIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  sortIcon.setAttribute('width', '16');
  sortIcon.setAttribute('height', '16');
  sortIcon.setAttribute('viewBox', '0 0 24 24');
  sortIcon.setAttribute('fill', 'none');
  sortIcon.setAttribute('stroke', 'currentColor');
  sortIcon.setAttribute('stroke-width', '2');
  sortIcon.setAttribute('stroke-linecap', 'round');
  sortIcon.setAttribute('stroke-linejoin', 'round');
  sortIcon.classList.add('sort-icon');
  sortIcon.innerHTML = '<polyline points="16 18 21 13 16 8"></polyline><polyline points="8 8 3 13 8 18"></polyline><line x1="3" y1="13" x2="21" y2="13"></line>';
  
  sortPriorityBtn.prepend(sortIcon);
  renderTasks();
}

function getFilteredAndSortedTasks() {
  let result = [...tasks];
  
  if (showOnlyCompleted) {
    result = result.filter(task => task.completed);
  }
  
  if (sortByPriority) {
    result.sort((a, b) => {
      const priorityValues = { low: 1, medium: 2, high: 3 };
      return priorityValues[a.priority] - priorityValues[b.priority];
    });
  }
  
  return result;
}

function getPriorityClass(priority) {
  switch (priority) {
    case 'low': return 'priority-low';
    case 'medium': return 'priority-medium';
    case 'high': return 'priority-high';
    default: return '';
  }
}

function getPriorityText(priority) {
  switch (priority) {
    case 'low': return 'Düşük';
    case 'medium': return 'Orta';
    case 'high': return 'Yüksek';
    default: return '';
  }
}

function renderTasks() {
  const filteredTasks = getFilteredAndSortedTasks();
  
  taskList.innerHTML = '';
  
  if (filteredTasks.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.className = 'empty-message';
    emptyMessage.textContent = 'Henüz görev eklenmemiş.';
    taskList.appendChild(emptyMessage);
    return;
  }
  
  filteredTasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskItem.dataset.id = task.id;
    
    taskItem.innerHTML = `
      <div class="task-content">
        <div class="task-header">
          <span class="task-title">${task.title}</span>
          <span class="task-priority ${getPriorityClass(task.priority)}">${getPriorityText(task.priority)}</span>
        </div>
        ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
      </div>
      <div class="task-actions">
        <button class="action-btn complete-btn" title="${task.completed ? 'Tamamlanmadı olarak işaretle' : 'Tamamlandı olarak işaretle'}">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg>
        </button>
        <button class="action-btn delete-btn" title="Görevi sil">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
      </div>
    `;
    
    taskList.appendChild(taskItem);
  });
}