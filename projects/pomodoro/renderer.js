const {ipcRenderer} = require("electron");

let timer;
let timeLeft = 25 * 60;
let isRunning = false;

const timerDisplay = document.getElementById("timer-div");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const pauseBtn = document.getElementById("pause-btn");


function updateDisplay() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    if(isRunning) return;
    isRunning = true;

    timer = setInterval(() => {
        if(timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            new Notification("Time's up", {body: "Take a short break. ☕"});
        }
    }, 1000);
}


function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
    updateDisplay();
}


startBtn.onclick = startTimer;
stopBtn.onclick = resetTimer;
pauseBtn.onclick = pauseTimer;


ipcRenderer.on("timer-control", (event, command) => {
    if(command === "start") startTimer();
    else if(command === "pause") pauseTimer();
    else if(command === "stop") resetTimer();
});