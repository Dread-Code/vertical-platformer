class Player {
  constructor({ position, collisionsBlocks }) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = 25;
    this.width = 25;
    this.collisionsBlocks = collisionsBlocks;
  }

  draw() {
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.checkForHorizontalCollision();
    this.applyGravity();
    this.checkForVerticalCollision();
  }

  applyGravity() {
    this.position.y += this.velocity.y;
    this.velocity.y += gravity;
  }

  checkForHorizontalCollision() {
    for (let i = 0; i < this.collisionsBlocks.length; i++) {
      const collision = this.collisionsBlocks[i];
      if (
        coliisionDetector({
          object1: this,
          object2: collision,
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          this.position.x = collision.position.x - this.width - 0.01;
          break;
        }
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          this.position.x = collision.position.x + collision.width + 0.01;
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
          object1: this,
          object2: collision,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.position.y = collision.position.y - this.height - 0.01;
          break;
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y = collision.position.y + collision.height + 0.01;
          break;
        }
      }
    }
  }
}
