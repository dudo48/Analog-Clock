let update_interval = 1000;
let hand_transform = "translate(-50%, -90%) ";
let dot_transform = "translate(-50%, -50%) "

addNumbers();
addDots();
run();

function run() {
    let short_hand = document.querySelector(".hours-hand");
    let long_hand = document.querySelector(".minutes-hand");
    let seconds_hand = document.querySelector(".seconds-hand");

    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ms = date.getMilliseconds();

    ms = Math.floor(ms / update_interval) * update_interval;    // precision of milliseconds depends on update interval

    let s_deg = (s + ms / 1000) * 6;
    let m_deg = (m + s_deg / 360) * 6;
    let h_deg = (h + m_deg / 360) * 30; // x2 because the clock reads 12 hours only

    seconds_hand.style.transform = hand_transform + `rotate(${s_deg}deg)`;
    long_hand.style.transform = hand_transform + `rotate(${m_deg}deg)`;
    short_hand.style.transform = hand_transform + `rotate(${h_deg}deg)`;

    // recursion
    setTimeout(run, update_interval);
}

// adds the numbers to be readable on clock
function addNumbers() {
    let numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    let clock = document.querySelector(".clock");
    let padding = 8;

    for(let i = 0; i < 12; ++i) {

        let x = 50 + (50 - padding) * Math.cos((i - 3) * Math.PI / 6);
        let y = 50 + (50 - padding) * Math.sin((i - 3) * Math.PI / 6);

        let num = document.createElement("h1");
        num.textContent = numbers[i];
        num.style.left = x + "%";
        num.style.top = y + "%";
        clock.prepend(num)
    }
}

function addDots() {
    let clock = document.querySelector(".clock");
    let padding = 0.5;

    for(let i = 0; i < 60; ++i) {
        let x = 50 + (50 - padding) * Math.cos((i - 15) * Math.PI / 30);
        let y = 50 + (50 - padding) * Math.sin((i - 15) * Math.PI / 30);

        let dot = document.createElement("div");
        dot.className = "dot";
        dot.style.left = x + "%";
        dot.style.top = y + "%";
        dot.style.transform = dot_transform + `rotate(${i * 6}deg)`;
        clock.prepend(dot);
    }
}