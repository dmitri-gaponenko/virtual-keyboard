export default class Actions {
  static addCharToTextarea(char) {
    const TEXTAREA = document.querySelector('#textarea');
    const [START, END] = [TEXTAREA.selectionStart, TEXTAREA.selectionEnd];
    TEXTAREA.value = TEXTAREA.value.slice(0, START)
      + char
      + TEXTAREA.value.slice(END, TEXTAREA.value.length);
    TEXTAREA.selectionStart = START + 1;
    TEXTAREA.selectionEnd = END + 1;
  }

  static backspaceFromTextarea() {
    const TEXTAREA = document.querySelector('#textarea');
    const [START, END] = [TEXTAREA.selectionStart, TEXTAREA.selectionEnd];
    if (TEXTAREA.selectionStart === TEXTAREA.selectionEnd) {
      if (TEXTAREA.value) {
        TEXTAREA.value = TEXTAREA.value.slice(0, START - 1)
          + TEXTAREA.value.slice(END, TEXTAREA.value.length);
      }
      TEXTAREA.selectionStart = START - 1;
      TEXTAREA.selectionEnd = TEXTAREA.selectionStart;
    } else {
      TEXTAREA.value = TEXTAREA.value.slice(0, START)
        + TEXTAREA.value.slice(END, TEXTAREA.value.length);
      TEXTAREA.selectionStart = START;
      TEXTAREA.selectionEnd = TEXTAREA.selectionStart;
    }
  }
}
