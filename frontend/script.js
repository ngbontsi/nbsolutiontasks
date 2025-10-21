// Simple client-only task manager with tags and localStorage
const STORAGE_KEY = 'buddy_tasks_v1';
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
function uid(){ return Date.now() + Math.floor(Math.random()*999); }

function render(filterTag){
  const container = document.getElementById('tasks');
  container.innerHTML = '';
  const list = (filterTag) ? tasks.filter(t => (t.tags||[]).includes(filterTag)) : tasks;
  if(list.length === 0){ container.innerHTML = '<div class="card small">No projects yet</div>'; return; }
  list.forEach(t => {
    const card = document.createElement('div'); card.className='card';
    const tagsHtml = (t.tags||[]).map(x=>`<span class="tag">${x}</span>`).join(' ');
    card.innerHTML = `
      <div><strong>${t.name}</strong> <span class="small">(${t.client||'—'})</span></div>
      <div class="small">Requested: ${t.requested||'-'} • Due: ${t.due||'-'}</div>
      <div style="margin-top:6px">${tagsHtml}</div>
      <div class="progress"><i style="width:${(t.progress||0)*100}%"></i></div>
      <div class="small">Status: <span class="status">${t.status||'Not Started'}</span></div>
      <div class="actions" style="margin-top:8px">
        <button onclick="cycleStatus(${t.id})">Change Status</button>
        <button onclick="editTask(${t.id})">Edit</button>
        <button onclick="deleteTask(${t.id})" style="background:#c33">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function addTask(data){
  tasks.push(Object.assign({id:uid(), status:'Not Started', progress:0}, data));
  save(); render();
}

document.getElementById('taskForm').addEventListener('submit', e=>{
  e.preventDefault();
  const newTask = {
    name: document.getElementById('name').value.trim(),
    client: document.getElementById('client').value.trim(),
    requested: document.getElementById('requested').value,
    due: document.getElementById('due').value,
    tags: (document.getElementById('tags').value||'').split(',').map(s=>s.trim()).filter(Boolean),
  };
  if(!newTask.name){ alert('Give it a name'); return; }
  addTask(newTask);
  document.getElementById('taskForm').reset();
});

function cycleStatus(id){
  const t = tasks.find(x=>x.id===id);
  if(!t) return;
  if(t.status==='Not Started'){ t.status='In Progress'; t.progress=0.5; }
  else if(t.status==='In Progress'){ t.status='Completed'; t.progress=1; }
  else { t.status='Not Started'; t.progress=0; }
  save(); render();
}

function editTask(id){
  const t = tasks.find(x=>x.id===id);
  if(!t) return alert('Not found');
  const newName = prompt('Project name', t.name);
  if(newName!==null) t.name = newName;
  const newNotes = prompt('Tags (comma separated)', (t.tags||[]).join(', '));
  if(newNotes!==null) t.tags = newNotes.split(',').map(s=>s.trim()).filter(Boolean);
  save(); render();
}

function deleteTask(id){
  if(!confirm('Delete project?')) return;
  tasks = tasks.filter(x=>x.id!==id);
  save(); render();
}

document.getElementById('applyFilter').addEventListener('click', ()=>{
  const f = document.getElementById('filterTag').value.trim();
  render(f||null);
});
document.getElementById('clearFilter').addEventListener('click', ()=>{
  document.getElementById('filterTag').value = '';
  render();
});

render();
