const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d"); // Where passing what kind of API we want to wrap 2d or 3d

canvas.width = 1024
canvas.height = 576

canvasContext.fillStyle = "white"
canvasContext.fillRect(0, 0, canvas.width, canvas.height);
