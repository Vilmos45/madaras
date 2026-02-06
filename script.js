const bird = document.getElementById("bird");
const GameScreen = document.getElementById("main_screen");
const score = document.getElementById("score");
let TotalScore = 0;

let InGame = false;
let facing = 1;
let velocityY = 0; 

bird.style.top = GameScreen.clientHeight + "px";

function jump() {
  let topVal = parseInt(getComputedStyle(bird).top) || 0;
  let newTop = topVal - 35;

  const maxTop = GameScreen.clientHeight - bird.offsetHeight;
  if (newTop < 0) 
    newTop = 0;

  bird.style.top = newTop + "px";
}

function BirdFall() {
  let topVal = parseInt(getComputedStyle(bird).top) || 0;
  let newTop = topVal + 6;

  const maxTop = GameScreen.clientHeight - bird.offsetHeight;
  if (newTop > maxTop) newTop = maxTop;

  bird.style.top = newTop + "px";
}

function down() {
  BirdFall();
  BirdFall();
}

function right() {
  facing = 1;
  bird.style.transform = "scaleX(1)";

  let leftVal = parseInt(getComputedStyle(bird).left) || 0;
  let newLeft = leftVal + 12;

  const max = GameScreen.clientWidth - bird.offsetWidth - 1;
  if (newLeft > max) //Amikor elérte a pálya szélét, akkor valamiért nem esik tovább lefele a madárka.
    newLeft = max;

  bird.style.left = newLeft + "px";
}


function left() {
  facing = -1;
  bird.style.transform = "scaleX(-1)";

  let leftVal = parseInt(getComputedStyle(bird).left) || 0;
  let newLeft = leftVal - 12;

  if (newLeft < 0) 
    newLeft = 0;

  bird.style.left = newLeft + "px";
}

function IsInsideParent(child, parent) {
  const childRect = child.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  return (
    childRect.left >= parentRect.left &&
    childRect.right < parentRect.right &&
    childRect.top >= parentRect.top &&
    childRect.bottom < parentRect.bottom
  );
}

function pauseGame() {
  InGame = !InGame;
  score.textContent = InGame ? TotalScore : "Paused";
}

addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft" || e.key === "a"){
    e.preventDefault();
    if (InGame)
      left()
  } 
  if (e.key === "ArrowRight"|| e.key === "d"){
    e.preventDefault();
    if (InGame)
      right()
  }
  if (e.key === "ArrowUp"|| e.key === "w") {
    e.preventDefault();
    if (InGame)
      jump()
  }
  if (e.key === "ArrowDown"|| e.key === "s")  {
    e.preventDefault();
    if (InGame)
      down()
  };
  if (e.key === "Enter"|| e.key === " ") {
    e.preventDefault();
    pauseGame();
  }
}, true);

//akadályok:minták, generálásuk a pályán, fal spriteok betöltése

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

function FirstWallGeneration(){
  const RWP = RandomWallPick();

  const rowDiv = document.getElementById("row1");

  RWP.forEach(value => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (value === 1) 
      cell.classList.add("Fal");
    rowDiv.appendChild(cell);
  });
}

function WallGeneration(){
  for (let i = 1; i < 4; i++) {
    const RWP = RandomWallPick();
    const rowDiv = document.getElementById("row" + i);

    RWP.forEach(value => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (value === 1) 
        cell.classList.add("Fal");
      rowDiv.appendChild(cell);
    });
  }
}

FirstWallGeneration();

function WallDeletion(){
  let cells =  document.getElementsByClassName("Fal");
  cells += document.getElementsByClassName("cell");
  cells.forEach(cell => {
    if(!IsInsideParent(cell, GameScreen)){
      cell.remove();
    }
  });
}

setInterval(() => {
  if (InGame) {
    if (!IsInsideParent(bird, GameScreen)) {
      pauseGame();
      score.textContent = "Gameover";
      return;
    } else {
      BirdFall();
    }
    TotalScore = TotalScore + 1;
    score.textContent = TotalScore;
  }
}, 1000 / 25);

//kamera 

const lineUpdater = document.createElement("div");
lineUpdater.style.position = "absolute";
lineUpdater.style.width = GameScreen.clientWidth + "px";
lineUpdater.style.height = "1px";
lineUpdater.style.backgroundColor = "red";
lineUpdater.style.top = GameScreen.clientHeight/2 + "px";   

GameScreen.appendChild(lineUpdater);

function isTouching(a, b) {
  const r1 = a.getBoundingClientRect();
  const r2 = b.getBoundingClientRect();

  return (
    r1.left < r2.right &&
    r1.right > r2.left &&
    r1.top < r2.bottom &&
    r1.bottom > r2.top
  );
}

function gameLoop() {
  if (isTouching(bird, lineUpdater)){
    console.log("Line touched!");
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
