const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d"); // Where passing what kind of API we want to wrap 2d or 3d

const collisionsBlocks = collisionBlocksGenerator(collisionsMerged);

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};
const gravity = 0.5;

const player = new Player({
  position: {
    x: 100,
    y: 300,
  },
  collisionsBlocks,
  imageSrc: "./img/warrior/Idle.png",
  frameRate: 8,
  animations: animationsImageInserter(animationsMap),
});

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background.png",
});

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
  canvasContext.save();
  canvasContext.scale(4, 4);
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
  /**
   * Translate the origin position background.position {x: 0, y: 0}
   * to the unities passed through the the function
   */
  canvasContext.translate(0, -background.image.height + scaledCanvas.height);
  background.update();
  collisionsBlocks.forEach((collision) => {
    collision.update();
  });

  player.update();

  player.velocity.x = 0;
  if (keys[Direction.Right].pressed) {
    player.switchSprite(Animations.Run);
    player.velocity.x = 1;
  } else {
    player.switchSprite(Animations.Idle);
  }
  if (keys[Direction.Left].pressed) player.velocity.x = -1;

  canvasContext.restore();
}

animate();
