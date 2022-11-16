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