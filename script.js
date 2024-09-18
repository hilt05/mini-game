const goat = document.getElementById("goat");
const leaf = document.getElementById("leaf");
const bike = document.getElementById("bike");
const scoreDisplay = document.getElementById("score");
let score = 0;
let goatPosition = 125;
let gameInterval;
let gameSpeed = 5;

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && goatPosition > 0) {
    goatPosition -= 20;
  } else if (event.key === "ArrowRight" && goatPosition < 250) {
    goatPosition += 20;
  }
  goat.style.left = `${goatPosition}px`;
});
function startGame() {
  resetObject(leaf, "leaf");
  resetObject(bike, "bike");
  gameInterval = setInterval(() => {
    moveObject(leaf, "leaf");
    moveObject(bike, "bike");
    checkCollision();
  }, 20);
}
function moveObject(object, type) {
  let objectTop = parseInt(
    window.getComputedStyle(object).getPropertyValue("top")
  );
  if (objectTop >= 600) {
    resetObject(object, type);
  } else {
    object.style.top = `${objectTop + gameSpeed}px`;
  }
}
function resetObject(object, type) {
  object.style.top = "-50px";
  object.style.left = `${Math.floor(Math.random() * 270)}px`;
}
function checkCollision() {
  let goatRect = goat.getBoundingClientRect();
  let leafRect = leaf.getBoundingClientRect();
  let bikeRect = bike.getBoundingClientRect();

  if (
    goatRect.left < leafRect.right &&
    goatRect.right > leafRect.left &&
    goatRect.top < leafRect.bottom &&
    goatRect.bottom > leafRect.top
  ) {
    score++;
    scoreDisplay.textContent = score;
    resetObject(leaf, "leaf");
  }
  if (
    goatRect.left < bikeRect.right &&
    goatRect.right > bikeRect.left &&
    goatRect.top < bikeRect.bottom &&
    goatRect.bottom > bikeRect.top
  ) {
    clearInterval(gameInterval);
    alert("Game Over! Your Score:" + score);
    window.location.reload();
  }
}
startGame();
