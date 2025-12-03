console.log(
  '%cGovnoDev', 
  'font-weight: 900; font-size: 60px; color: #ff9000; text-shadow: 3px 3px 0px #000; font-family: "Arial Black", sans-serif;'
);

/* UTILS */

const gameField = document.querySelector(".game-field");
const scoreShow = document.querySelector(".score");
const timeShow = document.querySelector(".score-time");
const startBtn = document.querySelector(".btn-start");

// let score = 0;
// let time = 30;
let timeInterval;
let isGameActive = false;
const targetSize = 50; /* !!!! розмір мішені */

/* FUNCTIONS */

function createTarget() {
    if (!isGameActive) return; /* !!!! для роботи score--, 35 line*/

    const target = document.createElement("div");
    target.classList.add("target");

    const maxX = gameField.clientWidth - targetSize;
    const maxY = gameField.clientHeight - targetSize;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
    target.style.width = `${targetSize}px`;
    target.style.height = `${targetSize}px`;

    gameField.appendChild(target);

    const lifeTimer = setTimeout(() => {
        if (gameField.contains(target)) {
            target.remove();
            score--; 
            scoreShow.textContent = `Score: ${score}`;
            createTarget();
        }
    }, 1000); /* !!!! час активності мішені, єслі 10 фасіка - зробити менше */

    target.addEventListener("click", () => {
        clearTimeout(lifeTimer);
        
        score++;
        scoreShow.textContent = `Score: ${score}`;
        target.remove();
        createTarget();
    });
}

function timerUpd() {
    time--;
    timeShow.textContent = `Time: ${time}`;

    if (time <= 0) {
        gameEnd();
    }
}

function gameStart() {
    isGameActive = true;
    score = 0;
    time = 30; /* !!!! час гри */
    scoreShow.textContent = `Score: ${score}`;
    timeShow.textContent = `Time: ${time}`;
    
    gameField.innerHTML = "";
    startBtn.style.display = "none";

    timeInterval = setInterval(timerUpd, 1000);
    createTarget();
}

function gameEnd() {
    isGameActive = false;
    clearInterval(timeInterval);
    gameField.innerHTML = "";

    if (score <= 15) {
        alert(`Моя бабця стріляє швидше за тебе! Твій рахунок: ${score}`);
    } else if (score <= 25) {
        alert(`Бро, треба тренуватися! Твій рахунок ${score}`);
    } else {
        alert(`Ти чемпіон! Твій рахунок ${score}`);
    }

    startBtn.textContent = "Play again";
    startBtn.style.display = "block";
}

startBtn.addEventListener("click", gameStart);