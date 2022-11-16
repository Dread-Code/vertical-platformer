const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d"); // Where passing what kind of API we want to wrap 2d or 3d

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;
class Player {
  constructor(position) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = 100;
  }

  draw() {
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(this.position.x, this.position.y, 100, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;

    /**
     * Logic when the player hit the bottom of canvas
     */
    if (this.position.y + this.height + this.velocity.y < canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0
  }
}

const player1 = new Player({
  x: 0,
  y: 0,
});

const player2 = new Player({
  x: 200,
  y: 0,
});

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */
function animate() {
  window.requestAnimationFrame(animate);
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  player1.update();
  player2.update();
}

animate();
