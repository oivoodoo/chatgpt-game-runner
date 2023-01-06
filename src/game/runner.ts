import Canvas from "./Canvas";
import Game from "./Game";
import Keyboard from "./Keyboard";

const bootstrap = () => {
  const canvas = new Canvas(400, 600);
  const game = new Game(canvas);
  const keyboard = new Keyboard();

  if (!document.querySelector("canvas")) {
    document.body.appendChild(canvas.canvas);
  }

  let score = 0;

  const player = {
    color: "black",
    x: 50,
    y: 50,
    width: 10,
    height: 10,
    jump: false,
    velocity: 0,
    gravity: 0.1,
    update() {
      if (this.velocity < 0) {
        console.log("PLAYER Y", this.y);
      }

      this.velocity += this.gravity;
      this.y += this.velocity;

      if (player.jump) {
        console.log("PLAYER JUMP", this.jump, player.jump);

        this.velocity = -5;

        player.jump = false;

        console.log(this.y, this.velocity);

        this.y += this.velocity;
      }

      // Ensure that the player stays on the ground
      if (this.y > canvas.height - this.height - 2) {
        this.y = canvas.height - this.height - 2;
        this.velocity = 0;
      }

      // Check for collisions with obstacles
      for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        if (
          this.x < obstacle.x + obstacle.width &&
          this.x + this.width > obstacle.x &&
          this.y < obstacle.y + obstacle.height &&
          this.y + this.height > obstacle.y
        ) {
          // Player has collided with an obstacle
          // Destroy the player into 100 pieces
          for (let i = 0; i < 100; i++) {
            const particle = {
              x: this.x,

              y: this.y,
              width: 1,
              height: 1,
              color: this.color,
              velocityX: Math.random() * 20 - 10,
              velocityY: Math.random() * 20 - 10,
              gravity: 0.5,
              update() {
                this.velocityX += this.gravity;
                this.x += this.velocityX;
                this.velocityY += this.gravity;
                this.y += this.velocityY;
              },
              draw() {
                canvas.drawRect(this.x, this.y, this.width, this.height, this.color);
              }
            };
            particles.push(particle);
          }
          // Stop the game
          game.stop();
        }
      }
    },
    draw() {
      canvas.drawRect(this.x, this.y, this.width, this.height, this.color);
    }
  };

  const obstacles = [];
  const toRemove = [];

  const generateObstacle = () => {
    const x = canvas.width;
    const y = canvas.height - 12;
    const width = 10;
    const height = 10;
    const color = Math.random() < 0.5 ? "gray" : "red";
    const obstacle = { x, y, width, height, color };
    obstacles.push(obstacle);
  };

  const particles = [];

  game.update = () => {
    player.update();

    if (Math.random() < 0.005) {
      if (obstacles.length > 0) {
        const lastObstacle = obstacles[obstacles.length - 1];
        if (canvas.width - lastObstacle.x > 50) {
          generateObstacle();
        }
      } else {
        generateObstacle();
      }
    }

    obstacles.forEach((obstacle) => {
      obstacle.x -= 0.5;
      // Check if player has jumped over the obstacle
      if (obstacle.x + obstacle.width < player.x && !toRemove.includes(obstacle)) {
        score += 100;

        toRemove.push(obstacle);
      }
    });

    particles.forEach((particle) => {
      particle.update();
    });
  };

  game.draw = () => {
    canvas.clear();

    // Draw the ground
    canvas.drawRect(0, canvas.height - 2, canvas.width, 2, "black");

    player.draw();
    obstacles.forEach((obstacle) => {
      canvas.drawRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, obstacle.color);
    });
    particles.forEach((particle) => {
      particle.draw();
    });

    // Draw the score
    canvas.context.fillStyle = "black";
    canvas.context.font = "16px sans-serif";
    canvas.context.textAlign = "left";
    canvas.context.textBaseline = "top";
    canvas.context.fillText(`Score: ${score}`, 10, 10);
  };

  keyboard.addKeyDownListener(32, () => {
    console.log("JUMP");

    player.jump = true;
  });

  game.start();

  return game;
};

export default bootstrap;
