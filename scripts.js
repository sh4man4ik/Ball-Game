let playButton = document.getElementById("playButton");
let ball = document.getElementById("ball");
let timer = document.getElementById("timer");
let countParagraph = document.getElementById("countParagraph");

let sound = new Audio('./src/scream.mp3');
sound.volume = 0.5;
sound.loop = false;

async function startGame() {
    playButton.style.display = "none";

    timer.style.display = "block";
    for (let i = 3; i >= 0; i--) {
        timer.textContent = i;
        await new Promise(r => setTimeout(r, 1000));
    }
    timer.style.display = "none";

    countParagraph.style.display = "block";
    ball.style.display = "block";

    randomPosition();
}

function randomPosition() {
    controlScreamer();

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let newLeft = Math.floor(Math.random() * (windowWidth - ball.offsetWidth));
    let newTop = Math.floor(Math.random() * (windowHeight - ball.offsetHeight));

    if (newTop < 200) {
        newTop += 200;
    }

    ballRandomColor();

    ball.style.top = newTop + "px";
    ball.style.left = newLeft + "px";
}

let count = 0;
let countScreamer = 0;

async function controlScreamer() {
    countParagraph.textContent = count;

    if (countScreamer == 0) {
        countScreamer =  Math.floor(Math.random() * 10 + 10);
    }

    if (count == countScreamer) {
        screamer();
    } else {
        count++;
    }
}

function ballRandomColor() {
    ball.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
}

async function screamer() {
    shout();

    ball.style.display = "none";
    countParagraph.style.display = "none";

    document.body.style.backgroundImage = 'url("./src/screamer.webp")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.height = '100vh'; 
}

function shout() {
    sound.play();
}
