// This is the JavaScript Code for the Updated version of Lets Bounce Some Balls

// Get canvas element and its context\const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Base Shape class that other shapes will inherit from
class Shape {
    constructor(x, y, velX, velY, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.size = size;
    }
}

// Ball class that extends Shape
class Ball extends Shape {
    constructor(x, y, velX, velY, size, color) {
        super(x, y, velX, velY, size); // Call parent constructor
        this.color = color;
        this.exists = true; // Determines if the ball is still active
    }

    // Draw the ball on the canvas
    draw() {
        if (!this.exists) return;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.8;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    // Update ball position and check for wall collisions
    update() {
        if (!this.exists) return;
        if (this.x + this.size >= canvas.width || this.x - this.size <= 0) {
            this.velX = -this.velX; // Reverse direction on horizontal collision
        }
        if (this.y + this.size >= canvas.height || this.y - this.size <= 0) {
            this.velY = -this.velY; // Reverse direction on vertical collision
        }
        this.x += this.velX;
        this.y += this.velY;
    }

    // Detect collision with other balls and change colors if collision occurs
    collisionDetect(balls) {
        for (let ball of balls) {
            if (this !== ball && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.size + ball.size) {
                    ball.color = this.color = getRandomColor();
                }
            }
        }
    }
}

// Evil Circle class that extends Shape
class EvilCircle extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20, 20); // Call parent constructor
        this.color = "white";
        this.setControls(); // Set keyboard controls for movement
    }

    // Draw Evil Circle on the canvas
    draw() {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Ensure Evil Circle stays within the canvas boundaries
    checkBounds() {
        if (this.x - this.size < 0) this.x = this.size;
        if (this.x + this.size > canvas.width) this.x = canvas.width - this.size;
        if (this.y - this.size < 0) this.y = this.size;
        if (this.y + this.size > canvas.height) this.y = canvas.height - this.size;
    }

    // Set keyboard controls for Evil Circle movement
    setControls() {
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    this.x -= this.velX;
                    break;
                case "ArrowRight":
                    this.x += this.velX;
                    break;
                case "ArrowUp":
                    this.y -= this.velY;
                    break;
                case "ArrowDown":
                    this.y += this.velY;
                    break;
            }
        });
    }

    // Detect collision with balls and remove them when they touch Evil Circle
    collisionDetect(balls) {
        for (let ball of balls) {
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.size + ball.size) {
                    ball.exists = false;
                    updateScore(); // Update score when a ball is removed
                }
            }
        }
    }
}

// Utility function to generate a random color
function getRandomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

// Update the displayed score by counting active balls
function updateScore() {
    const count = balls.filter(ball => ball.exists).length;
    document.getElementById("score").textContent = `Ball count: ${count}`;
}

// Initialize balls array
let balls = [];
for (let i = 0; i < 25; i++) {
    const size = Math.random() * 20 + 10;
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;
    const velX = (Math.random() - 0.5) * 4;
    const velY = (Math.random() - 0.5) * 4;
    const color = getRandomColor();
    balls.push(new Ball(x, y, velX, velY, size, color));
}

// Create an instance of EvilCircle at the center of the canvas
const evilCircle = new EvilCircle(canvas.width / 2, canvas.height / 2);

// Animation loop to update and render the game frame by frame
function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)"; // Semi-transparent background for smooth effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect(balls);
    }

    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect(balls);

    requestAnimationFrame(animate); // Continue animation loop
}

// Initialize score and start animation
updateScore();
animate();