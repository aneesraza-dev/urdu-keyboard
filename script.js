'use strict';

const TRANSLITERATION_MAP = {

  'a': 'ا',
  'A': 'آ',
  'i': 'ی',
  'I': 'ع',
  'u': 'و',
  'U': 'اُ',
  'e': 'ے',
  'E': 'ہ',
  'o': 'و',
  'b': 'ب',
  'B': 'بھ',
  'p': 'پ',
  'P': 'پھ',
  't': 'ت',
  'T': 'ٹ',
  'c': 'چ',
  'C': 'چھ',
  'd': 'د',
  'D': 'ڈ',
  'r': 'ر',
  'R': 'ڑ',
  'z': 'ز',
  'Z': 'ژ',
  's': 'س',
  'S': 'ص',
  'x': 'ش',
  'X': 'ث',
  'f': 'ف',
  'F': 'فھ',
  'q': 'ق',
  'Q': 'قھ',
  'k': 'ک',
  'K': 'کھ',
  'g': 'گ',
  'G': 'گھ',
  'l': 'ل',
  'L': 'لھ',
  'm': 'م',
  'M': 'مھ',
  'n': 'ن',
  'N': 'ں',
  'w': 'و',
  'W': 'واؤ',
  'h': 'ہ',
  'H': 'ح',
  'y': 'ی',
  'Y': 'ئ',
  'j': 'ج',
  'J': 'جھ',
  'v': 'و',
  'V': 'ظ',
  '0': '۰',
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹',
};

const KB_ROWS = [
  [
    { u: '۱', s: '!', l: '1' }, { u: '۲', s: '@', l: '2' }, { u: '۳', s: '#', l: '3' },
    { u: '۴', s: '$', l: '4' }, { u: '۵', s: '%', l: '5' }, { u: '۶', s: '^', l: '6' },
    { u: '۷', s: '&', l: '7' }, { u: '۸', s: '*', l: '8' }, { u: '۹', s: '(', l: '9' },
    { u: '۰', s: ')', l: '0' }, { u: '-', s: '_', l: '-' }, { u: '=', s: '+', l: '=' },
  ],
  [
    { u: 'ق', s: 'قھ', l: 'q' }, { u: 'و', s: 'واؤ', l: 'w' }, { u: 'ع', s: 'ے', l: 'e' },
    { u: 'ر', s: 'ڑ', l: 'r' }, { u: 'ت', s: 'ٹ', l: 't' }, { u: 'ی', s: 'ئ', l: 'y' },
    { u: 'ا', s: 'آ', l: 'u' }, { u: 'ح', s: 'ہ', l: 'i' }, { u: 'و', s: 'اُ', l: 'o' },
    { u: 'پ', s: 'پھ', l: 'p' }, { u: '[', s: '{', l: '[' }, { u: ']', s: '}', l: ']' },
  ],
  [
    { u: 'ا', s: 'آ', l: 'a' }, { u: 'س', s: 'ص', l: 's' }, { u: 'د', s: 'ڈ', l: 'd' },
    { u: 'ف', s: 'فھ', l: 'f' }, { u: 'گ', s: 'گھ', l: 'g' }, { u: 'ہ', s: 'ح', l: 'h' },
    { u: 'ج', s: 'جھ', l: 'j' }, { u: 'ک', s: 'کھ', l: 'k' }, { u: 'ل', s: 'لھ', l: 'l' },
    { u: '؛', s: ':', l: ';' }, { u: '\'', s: '"', l: "'" },
  ],
  [
    { u: 'ز', s: 'ژ', l: 'z' }, { u: 'ش', s: 'ث', l: 'x' }, { u: 'چ', s: 'چھ', l: 'c' },
    { u: 'ط', s: 'ظ', l: 'v' }, { u: 'ب', s: 'بھ', l: 'b' }, { u: 'ن', s: 'ں', l: 'n' },
    { u: 'م', s: 'مھ', l: 'm' }, { u: '،', s: '؟', l: ',' }, { u: '۔', s: '.', l: '.' },
    { u: '/', s: '؟', l: '/' },
  ],
  [
    { u: 'ث', s: 'ثھ', l: 'th' }, { u: 'ذ', s: 'ذھ', l: 'dh' }, { u: 'ڈ', s: 'ڈھ', l: 'D' },
    { u: 'ٹ', s: 'ٹھ', l: 'T' }, { u: 'ڑ', s: 'ڑھ', l: 'R' }, { u: 'ژ', s: 'ژھ', l: 'zh' },
    { u: 'غ', s: 'غھ', l: 'gh' }, { u: 'خ', s: 'خھ', l: 'kh' }, { u: 'ض', s: 'ضھ', l: 'dz' },
    { u: 'ظ', s: 'ظھ', l: 'Z' }, { u: 'ص', s: 'صھ', l: 'Sv' }, { u: 'ء', s: 'ئ', l: '\'' },
  ],
  [
    { u: 'َ', s: 'ً', l: 'a' },
    { u: 'ِ', s: 'ٍ', l: 'i' },
    { u: 'ُ', s: 'ٌ', l: 'u' },
    { u: 'ّ', s: 'ّ', l: '~' },
    { u: 'ْ', s: 'ْ', l: '^' },
    { u: 'ٰ', s: 'ٰ', l: '..' },
    { u: 'ؤ', s: 'ٔ', l: 'w' },
    { u: 'ة', s: 'ۃ', l: 'h' },
    { u: 'ٻ', s: 'ڀ', l: 'b2' },
    { u: 'ۓ', s: 'ے', l: 'e2' },
    { u: '﷽', s: '﷽', l: '♥' },
    { u: '﷼', s: '﷼', l: '₹' },
  ],
];

const state = {
  transliterationEnabled: true,
  shiftActive: false,
  capsLock: false,
  darkMode: false,
  keyboardVisible: true,
  fontSize: 22,
  fontFamily: "'Noto Nastaliq Urdu', serif",
  MIN_FONT: 12,
  MAX_FONT: 42,
};

const editor = document.getElementById('urdu-editor');
const virtualKbd = document.getElementById('virtual-keyboard');
const kbPanel = document.getElementById('keyboard-panel');
const btnTranslit = document.getElementById('btn-transliteration');
const btnToggleKbd = document.getElementById('btn-toggle-keyboard');
const btnDarkMode = document.getElementById('btn-dark-mode');
const btnCopy = document.getElementById('btn-copy');
const btnSelectAll = document.getElementById('btn-select-all');
const btnDownload = document.getElementById('btn-download');
const btnClear = document.getElementById('btn-clear');
const btnFontInc = document.getElementById('btn-font-inc');
const btnFontDec = document.getElementById('btn-font-dec');
const btnFontReset = document.getElementById('btn-font-reset');
const fontSizeDisplay = document.getElementById('font-size-display');
const fontSelect = document.getElementById('font-select');
const wordCountEl = document.getElementById('word-count');
const charCountEl = document.getElementById('char-count');
const modeLabel = document.getElementById('mode-label');
const toast = document.getElementById('toast');

function buildVirtualKeyboard() {
  virtualKbd.innerHTML = '';

  KB_ROWS.forEach((row, rowIdx) => {
    const rowEl = document.createElement('div');
    rowEl.className = 'kb-row';
    rowEl.dataset.row = rowIdx;

    if (rowIdx === 3) {
      rowEl.appendChild(makeSpecialKey('SHIFT', 'kb-key--shift', 'Shift'));
    }

    row.forEach(keyData => {
      const keyEl = document.createElement('button');
      keyEl.className = 'kb-key';
      if (rowIdx === 0) keyEl.classList.add('kb-key--num');
      keyEl.dataset.char = keyData.u;
      keyEl.dataset.shifted = keyData.s;
      keyEl.setAttribute('type', 'button');
      keyEl.setAttribute('title', `${keyData.u} (${keyData.l})`);

      const spanUrdu = document.createElement('span');
      spanUrdu.className = 'key-urdu';
      spanUrdu.textContent = keyData.u;

      const spanShift = document.createElement('span');
      spanShift.className = 'key-urdu-shift';
      spanShift.textContent = keyData.s;

      const spanLatin = document.createElement('span');
      spanLatin.className = 'key-latin';
      spanLatin.textContent = keyData.l;

      keyEl.appendChild(spanUrdu);
      if (keyData.s && keyData.s !== keyData.u) keyEl.appendChild(spanShift);
      keyEl.appendChild(spanLatin);

      keyEl.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const char = state.shiftActive ? keyData.s : keyData.u;
        insertAtCursor(char);
        if (state.shiftActive && !state.capsLock) deactivateShift();
        updateCounters();
      });

      rowEl.appendChild(keyEl);
    });

    if (rowIdx === 3) {
      rowEl.appendChild(makeSpecialKey('SHIFT', 'kb-key--shift', 'Shift'));
    }

    virtualKbd.appendChild(rowEl);
  });
}

function makeSpecialKey(label, extraClass, title) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `kb-key ${extraClass}`;
  btn.textContent = label;
  btn.title = title;
  btn.setAttribute('data-action', label.toLowerCase());
  btn.addEventListener('mousedown', (e) => {
    e.preventDefault();
    handleSpecialKey(label.toLowerCase());
  });
  return btn;
}

function handleSpecialKey(action) {
  if (action === 'shift') {
    if (state.shiftActive) {
      deactivateShift();
    } else {
      activateShift();
    }
  } else if (action === 'caps') {
    state.capsLock = !state.capsLock;
    if (state.capsLock) activateShift(); else deactivateShift();
  }
}

function activateShift() {
  state.shiftActive = true;
  document.body.classList.add('shift-active');
  document.querySelectorAll('.kb-key--shift').forEach(k => k.classList.add('shift-on'));
  document.querySelectorAll('.kb-key').forEach(k => {
    const u = k.querySelector('.key-urdu');
    const s = k.querySelector('.key-urdu-shift');
    if (u && s) {
      u.style.opacity = '.3';
      s.style.opacity = '1';
    }
  });
}

function deactivateShift() {
  state.shiftActive = false;
  document.body.classList.remove('shift-active');
  document.querySelectorAll('.kb-key--shift').forEach(k => k.classList.remove('shift-on'));
  document.querySelectorAll('.kb-key').forEach(k => {
    const u = k.querySelector('.key-urdu');
    const s = k.querySelector('.key-urdu-shift');
    if (u && s) {
      u.style.opacity = '1';
      s.style.opacity = '0';
    }
  });
}

function insertAtCursor(char) {
  if (!char) return;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const before = editor.value.substring(0, start);
  const after = editor.value.substring(end);
  editor.value = before + char + after;
  // Move cursor after inserted char
  const newPos = start + char.length;
  editor.setSelectionRange(newPos, newPos);
  editor.focus();
  saveToStorage();
}

editor.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace' || e.key === 'Delete') {
    setTimeout(updateCounters, 0);
    setTimeout(saveToStorage, 0);
    return;
  }

  if (!state.transliterationEnabled) return;

  if (e.ctrlKey || e.altKey || e.metaKey) return;

  const key = e.shiftKey ? e.key.toUpperCase() : e.key.toLowerCase();

  if (key.length !== 1) return;

  const mapped = TRANSLITERATION_MAP[e.shiftKey ? e.key : e.key.toLowerCase()]
    || TRANSLITERATION_MAP[e.key];

  if (mapped) {
    e.preventDefault();
    insertAtCursor(mapped);
    updateCounters();
  }
});

editor.addEventListener('input', () => {
  updateCounters();
  saveToStorage();
});

document.querySelectorAll('.kb-special-btn').forEach(btn => {
  btn.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const action = btn.dataset.action;
    if (action === 'backspace') {
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      if (start !== end) {
        editor.value = editor.value.substring(0, start) + editor.value.substring(end);
        editor.setSelectionRange(start, start);
      } else if (start > 0) {
        const text = editor.value;
        const chars = [...text];
        let removeEnd = start;
        editor.value = text.substring(0, start - 1) + text.substring(start);
        editor.setSelectionRange(start - 1, start - 1);
      }
    } else if (action === 'space') {
      insertAtCursor(' ');
    } else if (action === 'enter') {
      insertAtCursor('\n');
    }
    updateCounters();
    saveToStorage();
    editor.focus();
  });
});

function updateCounters() {
  const text = editor.value;
  charCountEl.textContent = text.length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  wordCountEl.textContent = words;
}

btnCopy.addEventListener('click', () => {
  if (!editor.value) return showToast('کچھ لکھیں پھر کاپی کریں');
  navigator.clipboard.writeText(editor.value)
    .then(() => showToast('متن کاپی ہو گیا ✓'))
    .catch(() => {
      editor.select();
      document.execCommand('copy');
      showToast('متن کاپی ہو گیا ✓');
    });
});

btnSelectAll.addEventListener('click', () => {
  editor.focus();
  editor.select();
  showToast('تمام متن منتخب ہو گیا');
});

btnDownload.addEventListener('click', () => {
  const text = editor.value;
  if (!text.trim()) return showToast('ڈاؤن لوڈ کے لیے کچھ لکھیں');
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `urdu-text-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('فائل ڈاؤن لوڈ ہو رہی ہے');
});



btnClear.addEventListener('click', () => {
  if (!editor.value) return;
  if (confirm('کیا آپ تمام متن مٹانا چاہتے ہیں؟')) {
    editor.value = '';
    updateCounters();
    saveToStorage();
    showToast('متن مٹا دیا گیا');
  }
});

function applyFont() {
  editor.style.fontFamily = state.fontFamily;
  editor.style.fontSize = state.fontSize + 'px';
  fontSizeDisplay.textContent = state.fontSize;
  savePrefsToStorage();
}

btnFontInc.addEventListener('click', () => {
  if (state.fontSize < state.MAX_FONT) {
    state.fontSize += 2;
    applyFont();
  }
});

btnFontDec.addEventListener('click', () => {
  if (state.fontSize > state.MIN_FONT) {
    state.fontSize -= 2;
    applyFont();
  }
});

btnFontReset.addEventListener('click', () => {
  state.fontSize = 22;
  applyFont();
});

fontSelect.addEventListener('change', () => {
  state.fontFamily = fontSelect.value;
  applyFont();
});

btnDarkMode.addEventListener('click', () => {
  state.darkMode = !state.darkMode;
  document.body.classList.toggle('dark-mode', state.darkMode);
  savePrefsToStorage();
  showToast(state.darkMode ? 'ڈارک موڈ آن' : 'لائٹ موڈ آن');
});

btnTranslit.addEventListener('click', () => {
  state.transliterationEnabled = !state.transliterationEnabled;
  btnTranslit.classList.toggle('active', state.transliterationEnabled);
  modeLabel.textContent = state.transliterationEnabled ? 'Transliteration ON' : 'Transliteration OFF';
  modeLabel.style.background = state.transliterationEnabled ? '' : 'var(--border)';
  modeLabel.style.color = state.transliterationEnabled ? '' : 'var(--text-muted)';
  showToast(state.transliterationEnabled ? 'ترجمہ نویسی فعال' : 'ترجمہ نویسی غیر فعال');
  savePrefsToStorage();
});

btnToggleKbd.addEventListener('click', () => {
  state.keyboardVisible = !state.keyboardVisible;
  kbPanel.classList.toggle('hidden', !state.keyboardVisible);
  btnToggleKbd.classList.toggle('active', state.keyboardVisible);
  showToast(state.keyboardVisible ? 'کی بورڈ ظاہر' : 'کی بورڈ پوشیدہ');
  savePrefsToStorage();
});

const STORAGE_KEYS = {
  CONTENT: 'urdu_kb_content',
  PREFS: 'urdu_kb_prefs',
};

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.CONTENT, editor.value);
  } catch (_) { }
}

function savePrefsToStorage() {
  try {
    const prefs = {
      fontSize: state.fontSize,
      fontFamily: state.fontFamily,
      darkMode: state.darkMode,
      transliterationEnabled: state.transliterationEnabled,
      keyboardVisible: state.keyboardVisible,
    };
    localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(prefs));
  } catch (_) { }
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTENT);
    if (saved) editor.value = saved;

    const prefsRaw = localStorage.getItem(STORAGE_KEYS.PREFS);
    if (prefsRaw) {
      const prefs = JSON.parse(prefsRaw);
      if (prefs.fontSize) state.fontSize = prefs.fontSize;
      if (prefs.fontFamily) state.fontFamily = prefs.fontFamily;
      if (typeof prefs.darkMode === 'boolean') state.darkMode = prefs.darkMode;
      if (typeof prefs.transliterationEnabled === 'boolean')
        state.transliterationEnabled = prefs.transliterationEnabled;
      if (typeof prefs.keyboardVisible === 'boolean')
        state.keyboardVisible = prefs.keyboardVisible;
    }
  } catch (_) { }
}

let toastTimer = null;

function showToast(message, duration = 2200) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

function init() {
  loadFromStorage();

  document.body.classList.toggle('dark-mode', state.darkMode);
  applyFont();

  fontSelect.value = state.fontFamily;

  btnTranslit.classList.toggle('active', state.transliterationEnabled);
  modeLabel.textContent = state.transliterationEnabled ? 'Transliteration ON' : 'Transliteration OFF';

  btnToggleKbd.classList.toggle('active', state.keyboardVisible);
  kbPanel.classList.toggle('hidden', !state.keyboardVisible);

  buildVirtualKeyboard();

  updateCounters();

  editor.focus();
}

document.addEventListener('DOMContentLoaded', init);
