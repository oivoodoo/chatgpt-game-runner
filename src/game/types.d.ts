declare class Game {
  constructor(canvas: Canvas);
  canvas: Canvas;
  running: boolean;
  update(deltaTime: number): void;
  draw(): void;
  start(): void;
  stop(): void;
  loop(): void;
}

declare class Canvas {
  constructor(width: number, height: number);
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  clear(): void;
  drawRect(x: number, y: number, width: number, height: number, color: string): void;
}

declare class Keyboard {
  constructor();
  keysDown: Set<number>;
  keyDownListeners: Map<number, (() => void)[]>;
  keyUpListeners: Map<number, (() => void)[]>;
  isKeyDown(keyCode: number): boolean;
  addKeyDownListener(keyCode: number, listener: () => void): void;
  addKeyUpListener(keyCode: number, listener: () => void): void;
}

type GameObject = {
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  jump: boolean;
  velocity: number;
  gravity: number;
  update(): void;
  draw(): void;
};
