class Keyboard {
  constructor() {
    this.keysDown = new Set();
    this.keyDownListeners = new Map();
    this.keyUpListeners = new Map();

    window.addEventListener("keydown", (event) => {
      this.keysDown.add(event.keyCode);
      if (this.keyDownListeners.has(event.keyCode)) {
        this.keyDownListeners.get(event.keyCode).forEach((listener) => listener());
      }
    });

    window.addEventListener("keyup", (event) => {
      this.keysDown.delete(event.keyCode);
      if (this.keyUpListeners.has(event.keyCode)) {
        this.keyUpListeners.get(event.keyCode).forEach((listener) => listener());
      }
    });
  }

  isKeyDown(keyCode) {
    return this.keysDown.has(keyCode);
  }

  addKeyDownListener(keyCode, listener) {
    if (!this.keyDownListeners.has(keyCode)) {
      this.keyDownListeners.set(keyCode, []);
    }
    this.keyDownListeners.get(keyCode).push(listener);
  }

  addKeyUpListener(keyCode, listener) {
    if (!this.keyUpListeners.has(keyCode)) {
      this.keyUpListeners.set(keyCode, []);
    }
    this.keyUpListeners.get(keyCode).push(listener);
  }
}

export default Keyboard;
