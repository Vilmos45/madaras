const bird = document.getElementById("bird");
const GameScreen = document.getElementById("main_screen");
const score = document.getElementById("score");
let TotalScore = 0;

let InGame = true;
let facing = 1;
let velocityY = 0; 

function jump() {
  let topVal = parseInt(getComputedStyle(bird).top) || 0;
  bird.style.top = (topVal - 48) + "px";
}

function BirdFall() {
  let topVal = parseInt(getComputedStyle(bird).top) || 0;
  bird.style.top = (topVal + 6) + "px";
}

function right() {
  facing = 1;
  bird.style.transform = "scaleX(1)";
  let leftVal = parseInt(getComputedStyle(bird).left) || 0;
  bird.style.left = (leftVal + 12) + "px";
}

function left() {
  facing = -1;
  bird.style.transform = "scaleX(-1)";
  let leftVal = parseInt(getComputedStyle(bird).left) || 0;
  bird.style.left = (leftVal - 12) + "px";
}

// Check if child is fully inside parent
function IsInsideParent(child, parent) {
  const childRect = child.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  return (
    childRect.left >= parentRect.left &&
    childRect.right <= parentRect.right &&
    childRect.top >= parentRect.top &&
    childRect.bottom <= parentRect.bottom
  );
}

addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") left();
  if (e.key === "ArrowRight") right();
  if (e.key === "ArrowUp") jump();
});

setInterval(() => {
  if (InGame) {
    if (!IsInsideParent(bird, GameScreen)) {
      score.textContent = "Gameover";
    } else {
      BirdFall();
    }
    TotalScore = TotalScore + 1;
    score.textContent = TotalScore;
  }

}, 1000 / 24);
