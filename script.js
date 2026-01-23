const bird = document.getElementById("bird");

function BirdFall(bird)
{
    let birdRect = bird.getBoundingClientRect()
}

function right() {
  bird.style.transform = "scaleX(1)";
  let leftVal = parseInt(getComputedStyle(bird).left);
  bird.style.left = (leftVal + 6) + "px";
}

function left() {
  let leftVal = parseInt(getComputedStyle(bird).left);
  bird.style.transform = "scaleX(-1)";
  bird.style.left = (leftVal - 6) + "px";
}

addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") left();
  if (e.key === "ArrowRight") right();
  if (e.key === "ArrowUp") jump();
});

