function generateConfetti(context, width, height, numberOfParticles) {
  for (let i = 0; i < numberOfParticles; i++) {
    // Generate random x and y coordinates
    let x = Math.random() * width;
    let y = Math.random() * height;
    // Generate random color
    let color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    // Draw circle at the generated coordinates
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
  }
}

let button = document.querySelector("button");
button.addEventListener("click", function () {
  let canvas = document.querySelector("#confetti");
  let context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  generateConfetti(context, canvas.width, canvas.height, 100);
});
