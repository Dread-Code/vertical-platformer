
class CollisionBlock {
    constructor({ position, height }) {
        this.position = position;
        this.width = 16;
        this.height = height
    }
    
    draw() {
        canvasContext.fillStyle = 'rgba(255, 0, 0, 0.5)'
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    
    update() {
        this.draw()
    }
}