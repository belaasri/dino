const game = document.getElementById('game');
const scoreElement = document.getElementById('score');
let score = 0;
let isJumping = false;
let isGameOver = false;

// Dino element
const dino = document.createElement('div');
dino.classList.add('dino');
game.appendChild(dino);

// Game variables
let dinoBottom = 0;
let gravity = 0.9;
let obstacleInterval;

function jump() {
    if (!isJumping) {
        isJumping = true;
        dino.style.backgroundImage = "url('assets/dino-jump.png')";
        let jumpCount = 0;
        const jumpInterval = setInterval(() => {
            if (jumpCount < 15) {
                dinoBottom += 4;
                jumpCount++;
            } else if (jumpCount < 30) {
                dinoBottom -= 4;
                jumpCount++;
            } else {
                clearInterval(jumpInterval);
                isJumping = false;
                dino.style.backgroundImage = "url('assets/dino-run.png')";
            }
            dino.style.bottom = dinoBottom + 'px';
        }, 20);
    }
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.right = '0px';
    game.appendChild(obstacle);

    let obstaclePosition = 600;
    const obstacleInterval = setInterval(() => {
        if (obstaclePosition < -30) {
            clearInterval(obstacleInterval);
            game.removeChild(obstacle);
            score += 10;
            scoreElement.textContent = `Score: ${score}`;
        } else if (
            obstaclePosition > 0 &&
            obstaclePosition < 60 &&
            dinoBottom < 50
        ) {
            // Collision detection
            gameOver();
        } else {
            obstaclePosition -= 10;
            obstacle.style.right = obstaclePosition + 'px';
        }
    }, 20);
}

function gameOver() {
    isGameOver = true;
    clearInterval(obstacleInterval);
    document.removeEventListener('keydown', handleKeyPress);
    alert(`Game Over! Score: ${score}`);
}

function handleKeyPress(e) {
    if (e.code === 'Space') {
        jump();
    }
}

function startGame() {
    if (isGameOver) return;
    obstacleInterval = setInterval(createObstacle, 2000);
}

document.addEventListener('keydown', handleKeyPress);
startGame();
