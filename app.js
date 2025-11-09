let h3 = document.querySelector("h3");
let h4 = document.querySelector("h4");
let currentScore = 0;
let highScore = 0;

let gamSeq = [];
let userSeq = [];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let btns = ["yellow", "green", "red", "blue"];

function startGame() {
  if (!started) {
    started = true;
    levelUp();
  }
}

// ✅ Start only once (mobile + pc)
document.addEventListener("keydown", startGame);
document.addEventListener("touchstart", startGame, { once: true });

// ❌ Do NOT use document click here (it breaks mobile)

// Flash the game button
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

// Flash when user presses
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
  userSeq = [];

  h3.innerText = `Score : ${currentScore * 10}`;
  currentScore++;

  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gamSeq.push(randColor);
  btnFlash(randBtn);
}

function Anscheck(idx) {
  if (userSeq[idx] === gamSeq[idx]) {
    if (userSeq.length == gamSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Score: <b>${(currentScore * 10) - 10}</b> <br> Tap / Key to Restart`;

    document.body.style.backgroundColor = "red";
    setTimeout(() => (document.body.style.backgroundColor = "white"), 200);

    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  // ✅ FIXED: let added
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  Anscheck(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));

function reset() {
  if (currentScore > highScore) {
    h4.innerText = `High Score : ${(currentScore * 10) - 10}`;
    highScore = (currentScore * 10) - 10;
  }
  currentScore = 0;
  gamSeq = [];
  userSeq = [];
  started = false;
  level = 0;

  // ✅ Allow start again after Game Over
  document.addEventListener("touchstart", startGame, { once: true });
}
