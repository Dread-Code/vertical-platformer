const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d"); // Where passing what kind of API we want to wrap 2d or 3d

canvas.width = 1024
canvas.height = 576


let y = 100

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 */
function animate() {
    window.requestAnimationFrame(animate)
    canvasContext.fillStyle = "white"
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)

    canvasContext.fillStyle = 'red'
    canvasContext.fillRect(200, y, 100, 100)
    y++
}

animate()