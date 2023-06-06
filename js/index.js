window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
};
let gameOn = false;
function startGame() {
  if (!gameOn){
  drawRoad();
  const car = createCar();
  const obstacles = createObstacles();
  let score = 0;
  gameOn = true;

 const gameInterval = setInterval(() => {
    updateCanvas();
    moveObstacles();
    drawObstacles();
    detectCollision();
    updateScore();
  }, 50);

  function updateCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawRoad();
    car.draw();
  }

  function createCar() {
    const car = new Car();
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowRight':
          car.moveRight();
          break;
        case 'ArrowLeft':
          car.moveLeft();
          break;
      }
    });

    return car;
  }

  function createObstacles() {
    const obstacles = [];

    setInterval(() => {
      const randomX = Math.floor(Math.random() * (roadWidth - 50)); 
      const obstacle = { x: randomX, y: 0 }; 

      obstacles.push(obstacle);
    }, 1500); 

    return obstacles;
  }

  function moveObstacles() {
    obstacles.forEach((obstacle) => {
      obstacle.y += 5; // Adjust the speed as desired
    });
  }

  function drawObstacles() {
    obstacles.forEach((obstacle) => {
      context.fillStyle = 'red';
      context.fillRect(obstacle.x, obstacle.y, 180, 20); // Adjust the size as desired
    });
  }

  function detectCollision() {
    obstacles.forEach((obstacle) => {
      if (
        car.x < obstacle.x + 180 &&
        car.x + 50 > obstacle.x &&
        car.y < obstacle.y + 20 &&
        car.y + 50 > obstacle.y
      ) {
        // Collision detected
        gameOver();
      }
    });
  }

  function updateScore() {
    score++;
    context.fillStyle = 'black';
    context.font = '24px Arial';
    context.fillText(`Score: ${score}`, 10, 30);
  }

  function gameOver() {
    clearInterval(gameInterval);
    context.fillStyle = 'black';
    context.font = '48px Arial';
    context.fillText('Game Over', roadWidth / 2 - 100, roadHeight / 2);
    gameOn = false;
  }

}}

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const roadWidth = canvas.width;
const roadHeight = canvas.height;
const laneWidth = roadWidth;

function drawRoad() {
  context.fillStyle = 'green';
  context.fillRect(0, 0, laneWidth, roadHeight);
  context.fillStyle = 'gray';
  context.fillRect(40, 0, roadWidth - 80, roadHeight);
  context.fillStyle = 'white';
  context.fillRect(50, 0, 10, roadHeight);
  context.fillRect(roadWidth - 60, 0, 10, roadHeight);
  context.strokeStyle = 'white';
  context.lineWidth = 4;
  context.setLineDash([10, 10]);
  context.moveTo(roadWidth / 2, 0);
  context.lineTo(roadWidth / 2, roadHeight);
  context.stroke();
}

class Car {
  constructor() {
    this.x = roadWidth / 2;
    this.y = roadHeight - 70;
    const img = document.createElement('img');
    img.addEventListener('load', () => {
      this.img = img;
      this.draw();
    });
    img.src = '/images/car.png';
  }

  moveLeft() {
    this.x -= 25;
  }
  moveRight() {
    this.x += 25;
  }
  draw() {
    context.drawImage(this.img, this.x, this.y, 50, 50);
  }
}
