// ฟังก์ชันตรวจสอบชื่อเพื่อเข้าสู่หน้าเมนูหลัก
function checkName() {
const nameInput = document.getElementById("nameInput").value.trim().toLowerCase();
    const errorText = document.getElementById("error");
const loginPage = document.getElementById("loginPage");
const menuPage = document.getElementById("menuPage");

const correctNames = ["toon", "ตูน","kanyanut","มิลิน"];

if (nameInput === "") {
errorText.innerText = "ใส่ชื่อก่อนน";
return;
}

if (correctNames.includes(nameInput)) {
errorText.innerText = "";
loginPage.style.display = "none";
menuPage.style.display = "block";

} else {
errorText.innerText = "ผิดดดด ลองใหม่สิ";
}
}

document.getElementById("nameInput").addEventListener("keypress", function(event) {
if (event.key === "Enter") {
checkName();
}
}); 

function showMemory() {
document.getElementById("menuPage").style.display = "none";
document.getElementById("memoryPage").style.display = "block";
}


function showLetter(){
document.getElementById("menuPage").style.display = "none";
document.getElementById("letterPage").style.display = "block";
}

function backToMenu(){
document.getElementById("letterPage").style.display = "none";
document.getElementById("menuPage").style.display = "flex";
document.getElementById("letterStart").style.display = "flex";
document.getElementById("letterContent").style.display = "none";
}

function playMusic(){
const music = document.getElementById("bgMusic");
music.play();
}

function openLetter(){
const envelope = document.querySelector(".envelope");
envelope.classList.add("shake");

setTimeout(() => {
document.getElementById("letterStart").style.display = "none";
document.getElementById("letterContent").style.display = "block";
envelope.classList.remove("shake");
}, 600);

}

function startLoveRain(){
const loveRain = document.getElementById("loveRain");
loveRain.innerHTML = "";
loveRain.style.display = "block";
const messages = [
"รักตูน","รักเธอ","คิดถึง","ตูนน่ารัก","เลิฟยู"," love you ","รักมากมาก"," you're my love "," rak ะนนนื "," rak toon t sud","รักแฟน","miss u"
," อยากคุยกับตูน " , "คิดถึงตูนตลอดเวลา" , " ตูนคือที่หนึ่งในใจ" ,"my babe","my love","อยู่ด้วยกันไปนานๆนะ"
];

let count = 0;
const max = 350;
const timer = setInterval(() => {
const box = document.createElement("div");
box.className = "love-popup";
box.innerText = messages[Math.floor(Math.random() * messages.length)];
box.style.left = Math.random() * 99 + "vw";
box.style.top = Math.random() * 99 + "vh";
loveRain.appendChild(box);
count++;
if(count >= max){
clearInterval(timer);
loveRain.addEventListener("click", function goBack(){
loveRain.style.display = "none";
backToMenu();
loveRain.removeEventListener("click", goBack);
});

}

}, 30);

} 


const gameWords = [
"รักตูน", "รักตูน",
"คิดถึง", "คิดถึง",
"love you", "love you",
"miss u", "miss u",
"แฟนน่ารัก", "แฟนน่ารัก",
"my love", "my love"
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;

function showMatchGame(){
document.getElementById("menuPage").style.display = "none";
document.getElementById("gamePage").style.display = "block";
restartGame();
}

function restartGame(){
const board = document.getElementById("gameBoard");
const popup = document.getElementById("winPopup");
board.innerHTML = "";
popup.style.display = "none";
firstCard = null;
secondCard = null;
lockBoard = false;
matchedCount = 0;
const shuffled = [...gameWords].sort(() => Math.random() - 0.5);
shuffled.forEach((word) => {
const card = document.createElement("div");
card.className = "card-game";
card.dataset.word = word;
card.innerText = "?";
card.onclick = () => flipCard(card);
board.appendChild(card);
});

}

function flipCard(card){
if(lockBoard) return;
if(card.classList.contains("open")) return;
if(card.classList.contains("matched")) return;

card.classList.add("open");
card.innerText = card.dataset.word;

if(!firstCard){
firstCard = card;
return;

}

secondCard = card;
lockBoard = true;

if(firstCard.dataset.word === secondCard.dataset.word){
firstCard.classList.add("matched");
secondCard.classList.add("matched");

matchedCount += 2;

firstCard = null;
secondCard = null;
lockBoard = false;

if(matchedCount === gameWords.length){
setTimeout(() => {
document.getElementById("winPopup").style.display = "flex";
}, 500);
}
}else{
setTimeout(() => {
firstCard.classList.remove("open");
secondCard.classList.remove("open");

firstCard.innerText = "?";
secondCard.innerText = "?";

firstCard = null;
secondCard = null;
lockBoard = false;
}, 800);
}
}

function closeGameWin(){
document.getElementById("winPopup").style.display = "none";
document.getElementById("gamePage").style.display = "none";
document.getElementById("menuPage").style.display = "flex";
} 

let loveCount = 0;
let loveTime = 5;
let loveTimer = null;
let lovePlaying = false;

function showLoveMaster(){
document.getElementById("menuPage").style.display = "none";
document.getElementById("loveMasterPage").style.display = "block";

resetLoveMaster();
}

function resetLoveMaster(){
loveCount = 0;
loveTime = 10;
lovePlaying = false;

document.getElementById("startLoveBtn").style.display = "inline-block";
document.getElementById("loveGameArea").style.display = "none";
document.getElementById("loveResultPopup").style.display = "none";
document.getElementById("timerText").innerText = "5.0";
document.getElementById("loveBar").style.width = "100%";
}

function startLoveMaster(){
loveCount = 0;
loveTime = 10 ;
lovePlaying = true;

document.getElementById("startLoveBtn").style.display = "none";
document.getElementById("loveGameArea").style.display = "block";
document.getElementById("timerText").innerText = "5.0";
document.getElementById("loveBar").style.width = "100%";

loveTimer = setInterval(() => {
loveTime -= 0.1;

if(loveTime <= 0){
loveTime = 0;
endLoveMaster();
}

document.getElementById("timerText").innerText = loveTime.toFixed(1);
document.getElementById("loveBar").style.width = (loveTime / 5 * 100) + "%";

}, 100);
}

function tapHeart(){
if(!lovePlaying) return;

loveCount++;

const heart = document.getElementById("heartTap");
heart.style.transform = "scale(.9)";

setTimeout(() => {
heart.style.transform = "scale(1)";
}, 80);
}

function endLoveMaster(){
clearInterval(loveTimer);
lovePlaying = false;

document.getElementById("loveCountText").innerText = loveCount;
document.getElementById("loveResultPopup").style.display = "flex";
}

function finishLoveMaster(){
document.getElementById("loveResultPopup").style.display = "none";
document.getElementById("loveMasterPage").style.display = "none";
document.getElementById("menuPage").style.display = "flex";
} 

const wheelItems = [
"เล่นเกมด้วยกัน",
"Deep talk",
"ตูนเล่านิทานให้ฟัง",
"เล่นrobloxด้วยกัน",
"นอนคุยกันน",
"รักตูน"
];

let wheelDegree = 0;
let spinning = false;
function showWheelPage(){
document.getElementById("menuPage").style.display = "none";
document.getElementById("wheelPage").style.display = "block";
}

function spinWheel(){
    if(spinning) return;
    spinning = true;

    const wheel = document.getElementById("wheel");
    const randomIndex = Math.floor(Math.random() * wheelItems.length);

    const segment = 360 / wheelItems.length;
    
    // คำนวณหักลบองศาเพื่อให้ช่องที่สุ่มได้หมุนขึ้นไปอยู่ด้านบนสุด (ตรงจุดหมุดพอดี)
    // ลบเพิ่มอีก 30 องศา (segment / 2) เพื่อให้หยุดตรงกลางช่อง ไม่ใช่ตรงเส้นแบ่ง
    const targetDegree = 360 - (randomIndex * segment) - (segment / 2);

    // หมุนแถมเพิ่ม 5 รอบ และเคลียร์เศษองศาเดิมออก
    wheelDegree += (360 * 5) + targetDegree - (wheelDegree % 360);

    wheel.style.transform = `rotate(${wheelDegree}deg)`;

    setTimeout(() => {
        document.getElementById("wheelResult").innerText = wheelItems[randomIndex];
        document.getElementById("wheelPopup").style.display = "flex";
        spinning = false;
    }, 4200);
}

function closeWheelPopup(){
document.getElementById("wheelPopup").style.display = "none";
} 



