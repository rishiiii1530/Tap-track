let h3= document.querySelector("h3");
let h4 = document.querySelector("h4");
let currentScore=0;
let highScore=0;

let gamSeq= [];
let userSeq= [];
let started = false;
let level=0;
let h2= document.querySelector("h2");
let btns =["yellow", "green", "red", "blue"];
 function startGame() {
  if (started === false) {
    console.log("game started");
    started = true;
    levelUp();
  }
}

// Remove this line if already present anywhere else ↓
// document.addEventListener("click", startGame);

// ✅ Correct Start Listeners
document.addEventListener("keydown", startGame);       // PC keyboard
document.addEventListener("touchstart", startGame, {once: true}); // Mobile touch
document.addEventListener("click", startGame, {once: true});      // Laptop mouse

 function btnFlash(btn){
    console.dir(btn);
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
 }
  function userFlash(btn){
    console.dir(btn);
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
 }
 function levelUp(){
    userSeq=[];
     h3.innerText = `Score : ${currentScore*10}`;
    currentScore++;
   
    level++;
    h2.innerText= `Level ${level}`;
    let randIdx = Math.floor(Math.random()*4);
    let randColor= btns[randIdx];
    let randBtn= document.querySelector(`.${randColor}`);
 gamSeq.push(randColor);
 console.log(gamSeq);
    btnFlash(randBtn);
 }
 function Anscheck(idx){
   
    if(userSeq[idx]===gamSeq[idx]){
       if(userSeq.length==gamSeq.length){
        setTimeout(levelUp, 1000);
       }
    }
    else{
        h2.innerHTML= `game over ! your score was <b>${currentScore*10-10} </b> <br>press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
         document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
 }
 function btnPress(){
    console.log(this);
   let btn= this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
   userSeq.push(userColor);
   Anscheck(userSeq.length-1);
 }
 let allBtns= document.querySelectorAll(".btn");
 for(btn of allBtns){
    btn.addEventListener("click", btnPress);
 }
 function reset(){
    if(currentScore > highScore)
       {
        h4.innerText= `High Score : ${(currentScore*10)-10}`;
       }
currentScore=0;

    gamSeq=[];
    userSeq=[];
    started= false;
    level =0;
 }
