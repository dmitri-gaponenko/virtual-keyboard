import LABELS from './labels.js';
import Actions from './actions.js';
import { createTextarea, createKeyboard } from './components.js';

const pressedButtons = new Set();
let language = localStorage.getItem('language')
  ? localStorage.getItem('language')
  : 'en';
let capsLockEnabled = false;
let shiftEnabled = false;

const createPage = () => {
  const body = document.querySelector('body');
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  const descDiv = document.createElement('div');
  descDiv.classList.add('description');
  const innerDiv = document.createElement('div');
  innerDiv.innerHTML = 'The virtual keyboard was created on <strong>macOS</strong>. The keyboard shortcut for changing language is <strong> shift + control</strong>';

  descDiv.appendChild(innerDiv);
  wrapper.appendChild(descDiv);
  wrapper.appendChild(createTextarea());
  wrapper.appendChild(createKeyboard());
  body.prepend(wrapper);

  const TEXTAREA = document.querySelector('#textarea');
  TEXTAREA.onblur = () => {
    const [START, END] = [TEXTAREA.selectionStart, TEXTAREA.selectionEnd];
    TEXTAREA.focus();
    TEXTAREA.selectionStart = START;
    TEXTAREA.selectionEnd = END;
  };
};

const createLabels = () => {
  LABELS.forEach((element) => {
    const button = document.querySelector(`#${element.id}`);
    if (language === 'en') {
      button.innerText = capsLockEnabled === true || shiftEnabled === true
        ? element.enBig
        : element.en;
    } else {
      button.innerText = capsLockEnabled === true || shiftEnabled === true
        ? element.ruBig
        : element.ru;
    }
  });
};

createPage();
createLabels();

const changeLanguage = () => {
  if (pressedButtons.has('ControlLeft') && pressedButtons.has('ShiftLeft')) {
    language = language === 'en' ? 'ru' : 'en';
    localStorage.setItem('language', language);
    createLabels();
  }
};

const changeCapsLock = () => {
  capsLockEnabled = !capsLockEnabled;
  createLabels();
};
const changeShift = () => {
  shiftEnabled = !shiftEnabled;
  createLabels();
};

document.onmousedown = (e) => {
  if (e.target.classList.contains('button')) {
    if (e.target.id === 'CapsLock') {
      e.target.classList.toggle('button_active');
      changeCapsLock();
      return;
    }
    if (e.target.id === 'ShiftLeft' || e.target.id === 'ShiftRight') {
      e.target.classList.toggle('button_active');
      changeShift();
      return;
    }

    e.target.classList.add('button_active');
    if (e.target.id === 'Tab') {
      Actions.addCharToTextarea('\t');
      return;
    }
    if (e.target.id === 'Enter') {
      Actions.addCharToTextarea('\n');
      return;
    }
    if (e.target.id === 'Space') {
      Actions.addCharToTextarea(' ');
      return;
    }
    if (e.target.id === 'Backspace') {
      Actions.backspaceFromTextarea();
      return;
    }
    if (
      [
        'fn',
        'AltLeft',
        'MetaLeft',
        'MetaRight',
        'AltRight',
        'ControlLeft',
      ].includes(e.target.id)
    ) {
      return;
    }

    Actions.addCharToTextarea(e.target.innerText);
  }
};
document.onmouseup = (e) => {
  if (e.target.classList.contains('button')) {
    if (e.target.id === 'CapsLock') {
      return;
    }
    if (e.target.id === 'ShiftLeft' || e.target.id === 'ShiftRight') {
      return;
    }
    e.target.classList.remove('button_active');
  }
};
document.onmouseout = (e) => {
  if (e.target.classList.contains('button')) {
    if (e.target.id === 'CapsLock') {
      return;
    }
    if (e.target.id === 'ShiftLeft' || e.target.id === 'ShiftRight') {
      return;
    }
    e.target.classList.remove('button_active');
  }
};

document.onkeydown = (e) => {
  e.preventDefault();
  const button = document.querySelector(`#${e.code}`);
  if (button) {
    if (e.code === 'CapsLock') {
      button.classList.toggle('button_active');
      changeCapsLock();
      return;
    }

    pressedButtons.add(e.code);
    button.classList.add('button_active');

    if (e.code === 'Tab') {
      Actions.addCharToTextarea('\t');
      return;
    }
    if (e.code === 'Enter') {
      Actions.addCharToTextarea('\n');
      return;
    }
    if (e.code === 'Space') {
      Actions.addCharToTextarea(' ');
      return;
    }
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      changeShift();
      return;
    }
    if (e.code === 'ShiftLeft' || e.code === 'ControlLeft') {
      changeLanguage();
      return;
    }
    if (e.code === 'Backspace') {
      Actions.backspaceFromTextarea();
      return;
    }
    if (
      ['fn', 'AltLeft', 'MetaLeft', 'MetaRight', 'AltRight'].includes(e.code)
    ) {
      return;
    }

    Actions.addCharToTextarea(button.innerText);
  }
};
document.onkeyup = (e) => {
  e.preventDefault();
  const button = document.querySelector(`#${e.code}`);
  if (button) {
    if (e.code === 'CapsLock') {
      return;
    }
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      changeShift();
    }
    button.classList.remove('button_active');
    pressedButtons.delete(e.code);
  }
};
