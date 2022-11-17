class Player extends Sprite {
  constructor({
    position,
    collisionsBlocks,
    platformCollisionsBlocks,
    imageSrc,
    frameRate,
    scale = 0.5,
    animations,
  }) {
    super({ imageSrc, frameRate, scale });
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.collisionsBlocks = collisionsBlocks;
    this.platformCollisionsBlocks = platformCollisionsBlocks;
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    };
    this.animations = animations;
    this.lastKey = null;
    this.camerabox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    }
  }

  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return;

    this.currentFrame = 0
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }

  update() {
    this.updateFrames();
    this.updateHitbox();

    this.updateCamera()
    // draws out the image
    canvasContext.fillStyle = "rgb(0, 0, 255  , 0.2 )";
    canvasContext.fillRect(
      this.camerabox.position.x,
      this.camerabox.position.y,
      this.camerabox.width,
      this.camerabox.height
    );


    // draws out the image
    // canvasContext.fillStyle = "rgb(0, 255, 0, 0.6)";
    // canvasContext.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   this.width,
    //   this.height
    // );

    // // draws out the hitbox
    // canvasContext.fillStyle = "rgb(255, 0, 0, 0.5)";
    // canvasContext.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // );

    this.draw();
    this.position.x += this.velocity.x;
    this.updateHitbox();
    this.checkForHorizontalCollision();
    this.applyGravity();
    this.updateHitbox();
    this.checkForVerticalCollision();
  }

  applyGravity() {
    this.velocity.y += gravity;
    this.position.y += this.velocity.y;
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 36,
        y: this.position.y + 26,
      },
      width: 10,
      height: 27,
    };
  }

  updateCamera(){
    this.camerabox = {
      position: {
        x: this.position.x - 60,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    }
  }

  shouldPanCameraToTheLeft({canvas, camera}){
    const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width;
    const scaledDownCanvasWidth = canvas.width / 4;
    if (cameraboxRightSide >= 576) return
    if (cameraboxRightSide >= scaledDownCanvasWidth + Math.abs(camera.position.x)){
      camera.position.x -= this.velocity.x
    }
  }
  shouldPanCameraToTheRight({canvas, camera}){
    const cameraboxLeftSide = this.camerabox.position.x;
    if (cameraboxLeftSide <= 0) return
    // camera.position.x is the current translation that have the camera
    if (cameraboxLeftSide <=  Math.abs(camera.position.x)){
      camera.position.x -= this.velocity.x
    }
  }



  checkForHorizontalCollision() {
    for (let i = 0; i < this.collisionsBlocks.length; i++) {
      const collision = this.collisionsBlocks[i];
      if (
        coliisionDetector({
          object1: this.hitbox,
          object2: collision,
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collision.position.x - offset - 0.01;
          break;
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          const offset = this.hitbox.position.x - this.position.x;

          /**
           * Remember that we set positive values 'cause the velocity is negative
           */
          this.position.x =
            collision.position.x + collision.width - offset + 0.01;
          break;
        }
      }
    }
  }

  checkForVerticalCollision() {
    for (let i = 0; i < this.collisionsBlocks.length; i++) {
      const collision = this.collisionsBlocks[i];
      if (
        coliisionDetector({
          object1: this.hitbox,
          object2: collision,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;

          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;

          this.position.y = collision.position.y - offset - 0.01;
          break;
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0;

          const offset = this.hitbox.position.y - this.position.y;

          this.position.y =
            collision.position.y + collision.height - offset + 0.01;
          break;
        }
      }
    }

    for (let i = 0; i < this.platformCollisionsBlocks.length; i++) {
      const collision = this.platformCollisionsBlocks[i];
      if (
        platformDetector({
          object1: this.hitbox,
          object2: collision,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;

          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;

          this.position.y = collision.position.y - offset - 0.01;
          break;
        }
      }
    }
  }

  setLastKey(lastKey) {
    this.lastKey = lastKey;
  }
}
