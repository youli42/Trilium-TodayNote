function pad(n) { return String(n).padStart(2, '0'); }

function fmt(d) {
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}

function getDateRange(preset) {
  var today = new Date();
  var end = new Date(today);
  var start;

  switch (preset) {
    case 'today':
      start = new Date(today);
      break;
    case 'yesterday':
      start = new Date(today);
      start.setDate(start.getDate() - 1);
      end.setTime(start.getTime());
      break;
    case '3d':
      start = new Date(today);
      start.setDate(start.getDate() - 2);
      break;
    case '7d':
      start = new Date(today);
      start.setDate(start.getDate() - 6);
      break;
    case 'week': {
      var day = today.getDay();
      var diff = day === 0 ? 6 : day - 1;
      start = new Date(today);
      start.setDate(start.getDate() - diff);
      break;
    }
    case 'month':
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      break;
  }

  return { start: fmt(start), end: fmt(end) };
}

function clearShortcutActive() {
  var active = document.querySelectorAll('#shortcuts .active');
  for (var j = 0; j < active.length; j++) {
    active[j].classList.remove('active');
  }
}

async function loadNotes(startStr, endStr) {
  var metaEl = document.getElementById('today-meta');
  var listEl = document.getElementById('today-list');

  metaEl.textContent = '加载中...';

  try {
    var notes = await api.runAsyncOnBackendWithManualTransactionHandling(async function(s, e) {
      var all = api.searchForNotes();
      return all
        .filter(function(n) {
          return n.dateCreated
            && n.dateCreated.substring(0, 10) >= s
            && n.dateCreated.substring(0, 10) <= e;
        })
        .map(function(n) {
          return {
            noteId: n.noteId,
            title: n.title,
            type: n.type,
            mime: n.mime,
            dateCreated: n.dateCreated
          };
        })
        .sort(function(a, b) {
          return new Date(a.dateCreated) - new Date(b.dateCreated);
        });
    }, [startStr, endStr]);

    listEl.innerHTML = '';
    metaEl.textContent = notes.length + ' 条笔记';

    if (notes.length === 0) {
      listEl.innerHTML =
        '<div class="empty-state">'
          + '<div class="empty-icon">📪</div>'
          + '<p>所选时间段内没有创建笔记</p>'
        + '</div>';
      return;
    }

    for (var i = 0; i < notes.length; i++) {
      var n = notes[i];
      var item = document.createElement('div');
      item.className = 'note-item';

      var time = document.createElement('span');
      time.className = 'note-time';
      time.textContent = n.dateCreated ? n.dateCreated.substring(5, 16) : '--:--';

      var icon = document.createElement('span');
      icon.className = 'note-icon';
      icon.textContent = getIcon(n.type, n.mime);

      var link = document.createElement('a');
      link.className = 'note-link';
      link.textContent = n.title;
      link.addEventListener('click', (function(id) {
        return function() { api.activateNote(id); };
      })(n.noteId));

      item.appendChild(time);
      item.appendChild(icon);
      item.appendChild(link);
      listEl.appendChild(item);
    }
  } catch (e) {
    listEl.innerHTML =
      '<div class="empty-state">'
        + '<div class="empty-icon">⚠️</div>'
        + '<p>加载失败: ' + e.message + '</p>'
      + '</div>';
    metaEl.textContent = '加载失败';
    console.error('动态笔记加载失败', e);
  }
}

function init() {
  var today = fmt(new Date());
  var startInput = document.getElementById('start-date');
  var endInput = document.getElementById('end-date');

  startInput.value = today;
  endInput.value = today;
  loadNotes(today, today);

  document.getElementById('search-btn').addEventListener('click', function() {
    var s = startInput.value;
    var e = endInput.value;
    if (s && e) {
      clearShortcutActive();
      loadNotes(s, e);
    }
  });

  document.getElementById('refresh-btn').addEventListener('click', function() {
    clearShortcutActive();
    loadNotes(startInput.value, endInput.value);
  });

  startInput.addEventListener('change', clearShortcutActive);
  endInput.addEventListener('change', clearShortcutActive);

  var btns = document.querySelectorAll('#shortcuts button');
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {
      clearShortcutActive();
      this.classList.add('active');
      var range = getDateRange(this.dataset.preset);
      startInput.value = range.start;
      endInput.value = range.end;
      loadNotes(range.start, range.end);
    });
  }
}

init();

function getIcon(type, mime) {
  var icons = {
    text: '📝', code: '💻', file: '📄', image: '🖼️',
    search: '🔍', book: '📓', relationMap: '🔗', render: '🎨'
  };
  if (mime && mime.indexOf('mermaid') !== -1) { return '🔷'; }
  if (type === 'code' && mime && mime.indexOf('javascript') !== -1) { return '🟨'; }
  if (type === 'code' && mime && mime.indexOf('html') !== -1) { return '🌐'; }
  return icons[type] || '📌';
}
