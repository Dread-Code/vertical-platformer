class Sprite {
    constructor({ position, imageSrc, frameRate = 1, frameBuffer = 8, scale = 1 }) {
        this.position = position;
        this.image = new Image();
        this.image.onload =  () => {
            this.width = (this.image.width / frameRate) * scale;
            this.height = this.image.height * scale;
        }
        this.image.src = imageSrc;
        this.frameRate = frameRate;
        this.currentFrame = 0
        this.frameBuffer = frameBuffer;
        this.elapsedFrames = 0;
    }
    
    draw() {
        if (!this.image) return
        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height,
        }

        canvasContext.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
    
    update() {
        this.draw()
        this.updateFrames()
    }

    updateFrames(){
        /**
         * this.elpasedFrames increase in every iteration
         */
        this.elapsedFrames++
        /**
         * This helps to make the animation slower
         */
        if (this.elapsedFrames % this.frameBuffer === 0) {
            /**
             * when the currentFrame reaches to 7(in the player case)
             * this.currentFrame will be restart to zero 
             */
            if(this.currentFrame < this.frameRate - 1) this.currentFrame++
            else this.currentFrame = 0;
        }
    }
}