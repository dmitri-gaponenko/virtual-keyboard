import { KEYS, FUNCTIONAL_KEYS } from './keys.js';

const createTextarea = () => {
  const textareaDiv = document.createElement('div');
  textareaDiv.classList.add('textarea');
  const textarea = document.createElement('textarea');
  textarea.id = 'textarea';
  textarea.cols = 100;
  textarea.rows = 10;
  textarea.autofocus = true;
  textareaDiv.appendChild(textarea);
  return textareaDiv;
};

const createKeyboard = () => {
  const keyboardDiv = document.createElement('div');
  keyboardDiv.classList.add('keyboard');

  KEYS.forEach((line) => {
    const lineDiv = document.createElement('div');
    lineDiv.classList.add('line');
    line.forEach((key) => {
      if (key === 'ArrowUp') {
        const arrowsDiv = document.createElement('div');
        arrowsDiv.classList.add('button-column');
        arrowsDiv.classList.add('button-func');
        const buttonUp = document.createElement('div');
        buttonUp.classList.add('button');
        buttonUp.classList.add('split-button');
        buttonUp.id = key;
        const buttonDown = document.createElement('div');
        buttonDown.classList.add('button');
        buttonDown.classList.add('split-button');
        buttonDown.id = 'ArrowDown';
        arrowsDiv.appendChild(buttonUp);
        arrowsDiv.appendChild(buttonDown);
        lineDiv.appendChild(arrowsDiv);
      } else {
        const button = document.createElement('div');
        button.classList.add('button');
        button.id = key;
        if (FUNCTIONAL_KEYS.includes(key)) {
          button.classList.add('button-func');
        }
        if (['Backspace', 'Tab'].includes(key)) {
          button.classList.add('button-med');
        }
        if (['CapsLock', 'Enter'].includes(key)) {
          button.classList.add('button-long');
        }
        if (['ShiftLeft', 'ShiftRight'].includes(key)) {
          button.classList.add('button-shift');
        }
        if (['MetaLeft', 'MetaRight'].includes(key)) {
          button.classList.add('button-command');
        }
        if (key === 'Space') {
          button.classList.add('button-space');
        }

        lineDiv.appendChild(button);
      }
    });
    keyboardDiv.appendChild(lineDiv);
  });

  return keyboardDiv;
};

export { createTextarea, createKeyboard };
