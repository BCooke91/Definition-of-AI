// This is the code for Lets Bounce Some Balls

// Get the canvas element from the DOM and get its 2D drawing context
const canvas = document.getElementById("bouncingBallsCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size to fill the entire window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ball class definition
class Ball {
    // Constructor for Ball objects with position (x, y), velocity (velX, velY), size, and color
    constructor(x, y, velX, velY, size, color) {
        this.x = x;        // x-coordinate of the ball
        this.y = y;        // y-coordinate of the ball
        this.velX = velX;  // Horizontal velocity of the ball
        this.velY = velY;  // Vertical velocity of the ball
        this.size = size;  // Size (radius) of the ball
        this.color = color; // Color of the ball
    }

    // Method to draw the ball on the canvas
    draw() {
        ctx.beginPath();                     // Begin drawing path
        ctx.fillStyle = this.color;          // Set the ball's color
        ctx.globalAlpha = 0.8;               // Apply slight transparency for motion effect
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Draw a circle for the ball
        ctx.fill();                          // Fill the circle with the color
    }

    // Method to update the ball's position based on its velocity
    update() {
        // Check if the ball hits the canvas boundaries and reverse its velocity if so
        if (this.x + this.size >= canvas.width || this.x - this.size <= 0) {
            this.velX = -this.velX; // Reverse the horizontal velocity
        }
        if (this.y + this.size >= canvas.height || this.y - this.size <= 0) {
            this.velY = -this.velY; // Reverse the vertical velocity
        }

        // Update the ball's position
        this.x += this.velX;
        this.y += this.velY;
    }

    // Method to detect collisions with other balls
    collisionDetect(balls) {
        for (let ball of balls) {
            // Skip the ball itself
            if (this !== ball) {
                // Calculate the distance between the centers of the two balls
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // If the distance is less than the sum of the two ball sizes, a collision occurs
                if (distance < this.size + ball.size) {
                    // Change the colors of both balls on collision
                    ball.color = this.color = getRandomColor();

                    // Reflect the velocities of the two balls for a bouncing effect
                    const tempVelX = this.velX;
                    const tempVelY = this.velY;

                    this.velX = ball.velX;
                    this.velY = ball.velY;

                    ball.velX = tempVelX;
                    ball.velY = tempVelY;
                }
            }
        }
    }
}

// Helper function to generate a random color in HSL format
function getRandomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`; // Random hue, 100% saturation, 50% lightness
}

// Array to store the balls
let balls = [];

// Create 25 random balls and add them to the balls array
for (let i = 0; i < 25; i++) {
    const size = Math.random() * 20 + 10; // Random size between 10 and 30
    const x = Math.random() * (canvas.width - size * 2) + size; // Random x-position within canvas bounds
    const y = Math.random() * (canvas.height - size * 2) + size; // Random y-position within canvas bounds
    const velX = (Math.random() - 0.5) * 4; // Random horizontal velocity between -2 and 2
    const velY = (Math.random() - 0.5) * 4; // Random vertical velocity between -2 and 2
    const color = getRandomColor(); // Generate a random color for the ball

    balls.push(new Ball(x, y, velX, velY, size, color)); // Create a new Ball object and add it to the balls array
}

// Function to animate the balls by repeatedly updating and drawing them
function animate() {
    // Fill the canvas with a semi-transparent black color to create a motion trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)"; // Slight transparency for motion blur
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas

    // Loop through all the balls and perform actions
    for (let ball of balls) {
        ball.draw();             // Draw the ball
        ball.update();           // Update the ball's position based on its velocity
        ball.collisionDetect(balls); // Check for collisions with other balls
    }

    // Reset the globalAlpha to 1 after each frame to avoid affecting other drawing operations
    ctx.globalAlpha = 1;

    // Call the animate function recursively to create the animation effect
    requestAnimationFrame(animate);
}

// Start the animation
animate();