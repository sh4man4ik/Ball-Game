let playButton = document.getElementById("playButton");
let ball = document.getElementById("ball");
let timer = document.getElementById("timer");
let countParagraph = document.getElementById("countParagraph");
let shareButton = document.getElementById("shareButton");

let countdown;
let backgroundMusic;
let soundScream;
let soundBallTap;
let soundBeep;
musicLoad();

function musicLoad() {
    backgroundMusic = new Audio('./src/backgroundMusic.mp3');
    backgroundMusic.volume = 0.15;
    backgroundMusic.loop = true;

    countdown = new Audio('./src/countdown.mp3');
    countdown.volume = 0.15;
    
    soundScream = new Audio('./src/scream.mp3');
    soundScream.volume = 1;
    
    soundBallTap = new Audio('./src/ball_tap.wav');
    soundBallTap.volume = 0.2;
    
    soundBeep = new Audio('./src/beep.wav');
    soundBeep.volume = 0.2;

    countdown.loop, soundScream.loop, soundBallTap.loop, soundBeep.loop = false;
}

async function startGame() {
    backgroundMusic.pause();

    playButton.style.display = "none";

    countdown.play();
    timer.style.display = "block";
    for (let i = 3; i >= 0; i--) {
        timer.textContent = i;
        await new Promise(r => setTimeout(r, 880));
    }
    timer.style.display = "none";

    countParagraph.style.display = "block";
    ball.style.display = "block";

    randomPosition();
    backgroundMusic.play();
}

let count = -1;
let countScreamer = 0;

function randomPosition() {
    if (count >= 0) {
        controlScreamer();
    }

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let newLeft = Math.floor(Math.random() * (windowWidth - ball.offsetWidth));
    newLeft *= 0.8;
    let newTop = Math.floor(Math.random() * (windowHeight - ball.offsetHeight));
    newTop *= 0.8;

    if (newTop < 200) {
        newTop += 200;
    }

    ballRandomColor();

    ball.style.top = newTop + "px";
    ball.style.left = newLeft + "px";

    count++;
}

async function controlScreamer() {
    soundBallTap.play();

    countParagraph.classList.add('scale');
    countParagraph.textContent = count;

    if (countScreamer == 0) {
        countScreamer =  Math.floor(Math.random() * 10 + 10);
    }

    if (count == countScreamer) {
        backgroundMusic.pause();
        screamer();
    } else {
        countParagraph.style.transform = "scale(1.2)";
        await new Promise(r => setTimeout(r, 150));
        countParagraph.style.transform = "scale(1)";
        countParagraph.textContent = count;
    }
}

function ballRandomColor() {
    ball.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    
    let style = document.createElement('style');
    document.head.appendChild(style);

    style.sheet.insertRule(`#ball:before, #ball:after {
        border: 1px solid ${ball.style.backgroundColor};
    }`, style.sheet.cssRules.length);
    }

async function screamer() {
    ball.style.display = "none";
    countParagraph.style.display = "none";

    document.body.style.backgroundImage = 'url("./src/screamer.webp")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.height = '100vh'; 

    shout();

    await new Promise(r => setTimeout(r, 2500));
    shareButton.style.opacity = '1';
    shareButton.style.transform = 'scale(1)';
}

function shout() {
    soundScream.play();
}

document.getElementById('shareButton').addEventListener('click', async () => {
    soundBeep.play();

    try {
        await navigator.share({
            title: 'Ball Game',
            text: 'Самая интересная игра! Сможешь набрать больше 20?',
            url: "https://justcookiecookie.github.io/Ball-Game/"
        });
    } catch (error) {
        console.error('Ошибка при попытке поделиться:', error);
    }
});

ball.addEventListener('click', () => {
    ball.style.transition = "transform 0.3s ease";
    ball.style.transform = "scale(1.1)";
    setTimeout(() => {
        ball.style.transform = "scale(1)";
    }, 100);
});
