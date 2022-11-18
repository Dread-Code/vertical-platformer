const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d"); // Where passing what kind of API we want to wrap 2d or 3d

const collisionsBlocks = collisionBlocksGenerator(floorCollisions);
const platformCollisionsBlocks = collisionBlocksGenerator(
  platformCollisions,
  4
);

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};
const gravity = 0.1;

const player = new Player({
  position: {
    x: 100,
    y: 300,
  },
  collisionsBlocks,
  platformCollisionsBlocks,
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

const camera = {
  position: {
    x: 0,
    y: -432 + scaledCanvas.height,
  },
};

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
  canvasContext.translate(camera.position.x, camera.position.y);
  background.update();
  collisionsBlocks.forEach((collision) => {
    collision.update();
  });
  platformCollisionsBlocks.forEach((collision) => {
    collision.update();
  });

  player.update();

  player.velocity.x = 0;
  if (keysState[Direction.Right].pressed) {
    player.switchSprite(Animations.Run);
    player.velocity.x = 2;
    player.setLastKey(Direction.Right);
    player.shouldPanCameraToTheLeft({ canvas, camera });
  } else if (keysState[Direction.Left].pressed) {
    player.switchSprite(Animations.RunLeft);
    player.velocity.x = -2;
    player.setLastKey(Direction.Left);
    player.shouldPanCameraToTheRight({ canvas, camera });
  } else if (keysState[Direction.Up].pressed) {
    player.shouldPanCameraDown({ canvas, camera });
    player.velocity.y = -3;
  } else if (player.velocity.x === 0 && player.lastKey === Direction.Right)
    player.switchSprite(Animations.Idle);
  else if (player.velocity.x === 0 && player.lastKey === Direction.Left)
    player.switchSprite(Animations.IdleLeft);
  else if(player.velocity.x === 0) player.switchSprite(Animations.Idle);

  if (player.velocity.y < 0 && player.lastKey === Direction.Right)
    player.switchSprite(Animations.Jump);
  else if (player.velocity < 0 && player.lastKey === Direction.Left)
    player.switchSprite(Animation.JumpLeft);
  else if (player.velocity.y > 0) {
    player.shouldPanCameraUp({ canvas, camera });
    if (player.lastKey === Direction.Right)
      player.switchSprite(Animations.Fall);
    else player.switchSprite(Animations.FallLeft);
  }

  canvasContext.restore();
}

animate();
