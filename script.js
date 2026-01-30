const bird = document.getElementById("bird");
const GameScreen = document.getElementById("main_screen");
const score = document.getElementById("score");
let TotalScore = 0;

let InGame = false;
let facing = 1;
let velocityY = 0; 

function jump() {
  let topVal = parseInt(getComputedStyle(bird).top) || 0;
  bird.style.top = (topVal - 48) + "px";
  if (!IsInsideParent(bird, GameScreen)) {
    bird.style.top = (topVal) + "px";
  }
}

function BirdFall() {
  let topVal = parseInt(getComputedStyle(bird).top) || 0;
  bird.style.top = (topVal + 6) + "px";
  if (!IsInsideParent(bird, GameScreen)) {
    bird.style.top = (topVal) + "px";
  }
}

function down() {
  let topVal = parseInt(getComputedStyle(bird).top) || 0;
  bird.style.top = (topVal + 12) + "px";
  if (!IsInsideParent(bird, GameScreen)) {
    bird.style.top = (topVal) + "px";
  }
}

function right() {
  facing = 1;
  bird.style.transform = "scaleX(1)";
  let leftVal = parseInt(getComputedStyle(bird).left) || 0;
  bird.style.left = (leftVal + 12) + "px";
  if (!IsInsideParent(bird, GameScreen)) {
    bird.style.left = (leftVal) + "px";
  }
}

function left() {
  facing = - 1;
  bird.style.transform = "scaleX(-1)";
  let leftVal = parseInt(getComputedStyle(bird).left) || 0;
  bird.style.left = (leftVal - 12) + "px";
  if (!IsInsideParent(bird, GameScreen)) {
    bird.style.left = (leftVal) + "px";
  }
}

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

function pauseGame() {
  InGame = !InGame;
  score.textContent = InGame ? TotalScore : "Paused";
}

addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft" || e.key === "a") (InGame) ? left() : null;
  if (e.key === "ArrowRight"|| e.key === "d") (InGame) ? right() : null;
  if (e.key === "ArrowUp"|| e.key === "w") (InGame) ? jump() : null;
  if (e.key === "ArrowDown"|| e.key === "s") (InGame) ? down() : null;
  if (e.key === "Enter"|| e.key === " ") pauseGame();
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
}, 1000 / 25);

//akadályok:minták,generálásuk a pályán, fal spriteok betöltése

const Templates = Object.freeze({
  1: Object.freeze([0, 1, 0, 1, 0]),
  2: Object.freeze([1, 0, 1, 0, 1]),
  3: Object.freeze([0, 0, 1, 0, 1]),
  4: Object.freeze([1, 0, 1, 0, 0]),
  5: Object.freeze([1, 1, 0, 1, 0]),
  6: Object.freeze([0, 1, 0, 1, 1]),
  7: Object.freeze([0, 1, 1, 0, 1]),
  8: Object.freeze([1, 0, 0, 0, 1]),
  9: Object.freeze([1, 1, 0, 1, 1]),
  10: Object.freeze([0, 1, 1, 1, 0]),
});
//azért jó az Object.freeze, mert utána nem lehet átírni benne lévő objektumokat véletlen 

function RandomWallPick()
{
  const keys = Object.keys(Templates);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return Templates[randomKey]; 
}

const RWP = RandomWallPick();

const rowDiv = document.getElementById("row");

RWP.forEach(value => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  if (value === 1) {
    cell.classList.add("Fal_kozepso");
  }
  rowDiv.appendChild(cell);
});
