 const canvas = document.getElementById('bouncingCanvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size to fill the window
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Circle class
  class Circle {
    constructor(x, y, radius, dx, dy, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.dx = dx; // velocity in the x direction
      this.dy = dy; // velocity in the y direction
      this.color = color;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }

    update() {
      // Check for collision with walls
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      // Move the circle
      this.x += this.dx;
      this.y += this.dy;

      // Draw the circle
      this.draw();
    }
  }

  // Generate random circles
  const circles = [];
  const numCircles = 100;

  for (let i = 0; i < numCircles; i++) {
    const radius = Math.random() * 20 + 10; // random radius between 10 and 30
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 4; // random x velocity
    const dy = (Math.random() - 0.5) * 4; // random y velocity
    const color = `hsl(${Math.random() * 360}, 70%, 50%)`; // random color

    circles.push(new Circle(x, y, radius, dx, dy, color));
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Update and draw each circle
    circles.forEach((circle) => circle.update());

    requestAnimationFrame(animate); // Recursive call to animate
  }

  animate();

  // Resize canvas when the window resizes
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
