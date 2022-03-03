function updateElement(id, text) {
  const el = document.getElementById(id);
  el.innerHTML = text; 
}

function hideElement(id) { 
  const el = document.getElementById(id);
  el.style.display = 'none';
}

function showElement(id) { 
  const el = document.getElementById(id);
  el.style.display = 'inline-block';
}

export default function syncUI(name, count) {
  console.log('syncing ui');
  if (!name) {
    hideElement('counter');
    hideElement('logout-btn');
    updateElement('username', '');
    updateElement('count', '');
    showElement('message');
  } else {
    hideElement('login-btn');
    hideElement('message');
    updateElement('username', name);
    updateElement('count', count);
    showElement('counter');
    showElement('logout-btn');
  }
}
