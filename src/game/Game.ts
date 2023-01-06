class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.running = false;
    this.update = () => {};
    this.draw = () => {};
  }

  start() {
    this.running = true;
    this.lastTime = performance.now();
    this.loop();
  }

  stop() {
    this.running = false;
  }

  loop() {
    if (this.running) {
      requestAnimationFrame(() => this.loop());
    }

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    this.update(deltaTime);
    this.draw();
    this.lastTime = currentTime;
  }
}

export default Game;
