const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d"); // Where passing what kind of API we want to wrap 2d or 3d

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}
const gravity = 0.5;

class Sprite {
    constructor({ position, imageSrc }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
    }
    
    draw() {
        if (!this.image) return
        canvasContext.drawImage(this.image, this.position.x, this.position.y);
    }
    
    update() {
        this.draw()
    }
}

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
        this.position.x += this.velocity.x;
        
        /**
         * Logic when the player hit the bottom of canvas
         */
        if (this.position.y + this.height + this.velocity.y < canvas.height)
        this.velocity.y += gravity;
        else this.velocity.y = 0;
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

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/background.png'
})
console.log(-background.image.height + scaledCanvas.height);

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */
function animate() {
  window.requestAnimationFrame(animate);
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  /**
   * save and restore avoid to sclae the image infinitely
   */
  canvasContext.save()
  canvasContext.scale(4, 4)
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
  /**
   * Translate the origin position background.position {x: 0, y: 0}
   * to the unities passed through the the function
   */
  canvasContext.translate(0, -background.image.height + scaledCanvas.height)
  background.update()
  canvasContext.restore()

  player1.update();
  player2.update();

  player1.velocity.x = 0;
  if (keys.d.pressed) player1.velocity.x = 1;
  else if (keys.a.pressed) player1.velocity.x = -1;
}
/**
 * Object to reference if any key is pressed
 */
const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

animate();

/**
 * Both eventListener are used for detecting if
 * a key is pressed or not
 */
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "w":
      player1.velocity.y = -15;
      break;
    default:
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      player1.velocity.y = -15;
      break;
    default:
      break;
  }
});
