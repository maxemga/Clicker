let button = document.getElementById("button");
let counter = document.getElementById("counter");
let display = document.getElementById("display");
let board = document.getElementById("board");

let numberSheet = 1;
let cout = 0;
let isStart = false;

let timerCout = 5000;


let results = [];

counter.innerHTML = cout;
document.addEventListener("keypress", AutoClicker); 
button.addEventListener("mouseup", UpButton);
button.addEventListener("mousedown", DownButton);
button.addEventListener("click", Start);

class List {
    constructor(cout) {
        this.cout = cout
    }
    getContainer() {
        return `<p> ${numberSheet}. ${this.cout}</p>`
    }
}

function Start() {
    Click();
    !isStart ? Timer() : null;
    isStart = true;
    button.innerHTML = "CLICK";
    
}

function Click() {
    cout++;
    counter.innerHTML = cout;
}
let timerDisplay;
function Timer() {
    let startTime = Date.now();
    const interval = setInterval(() => {
        let time = Date.now() - startTime;
        timerDisplay = timerCout - time;
        display.innerHTML = Format(timerDisplay);
        if (timerDisplay <= 0) {
            clearInterval(interval);
            FinishGame();
        }
    });  
}

function FinishGame() {
    display.innerHTML = "GameOver";
    button.disabled = true;
    CreateList();
    Restart();
}

function CreateList() {
    let amount = new List(cout);
    results.push(amount);
    console.log(results);
    board.insertAdjacentHTML('beforeend', amount.getContainer());
}

function Restart() {   
    setTimeout(() => {
        button.innerHTML = "RESTART";
        button.disabled = false;
        isStart = false;
        cout = 0;
        timerCout = 5000;
        counter.innerHTML = cout;
        numberSheet++;
    }, 1500);
}

function AutoClicker(event) {
    if (event.code == "KeyZ") {
        setInterval(() => {
            button.click();
        });
    }
}

function Format(ms) {
    return Number.parseFloat(ms / 1000).toFixed(2); 
}

function UpButton() {
    button.classList.add("active");
}

function DownButton() {
    button.classList.remove("active");
}