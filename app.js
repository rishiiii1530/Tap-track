let gamSeq= [];
let userSeq= [];
let started = false;
let level=0;
let h2= document.querySelector("h2");
let btns =["yellow", "green", "red", "blue"];
 document.addEventListener("keypress", function(){
   if(started== false){
    console.log("game started");
    started= true;
    levelUp();
   }
 });
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
    level++;
    h2.innerText= `Lever ${level}`;
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
        h2.innerHTML= `game over ! your score was <b>${level} </b> <br>press any key to restart`;
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
    gamSeq=[];
    userSeq=[];
    started= false;
    level =0;
 }