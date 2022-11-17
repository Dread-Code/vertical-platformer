class Player extends Sprite {
  constructor({
    position,
    collisionsBlocks,
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
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    };
    this.animations = animations
  }

  switchSprite(key){
    if(this.image === this.animations[key]) return

    this.image = this.animations[key].image
  }

  update() {
    this.updateFrames();
    this.updateHitbox();

    // draws out the image
    canvasContext.fillStyle = "rgb(0, 255, 0, 0.6)";
    canvasContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    // draws out the hitbox
    canvasContext.fillStyle = "rgb(255, 0, 0, 0.5)";
    canvasContext.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    );

    this.draw();
    this.position.x += this.velocity.x;
    this.updateHitbox();
    this.checkForHorizontalCollision();
    this.applyGravity();
    this.updateHitbox();
    this.checkForVerticalCollision();
  }

  applyGravity() {
    this.position.y += this.velocity.y;
    this.velocity.y += gravity;
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
  }
}
