var minute = 0;
var second = 0;
var count = 0;
var running = false;
var timer;

var button = document.getElementById("button");
button.addEventListener("click", toggle);

function toggle() {
    if (running) {
        stop();
    } else {
        start();
    }
}

function start() {
    running = true;
    button.value = "Stop";
    button.removeEventListener("click", start);
    button.addEventListener("click", stop);

    stopwatch();
}

function stop() {
    running = false;
    button.value = "Start";
    button.removeEventListener("click", stop);
    button.addEventListener("click", start);

    clearInterval(timer);

    let name = document.getElementById("name").value;
    let timeTaken = formatTime(minute, second, count);

    addRecord(name, timeTaken);

    reset();
    clearInputs();
}

function reset() {
    minute = 0;
    second = 0;
    count = 0;
    updateDisplay();
}

function clearInputs() {
    document.getElementById("name").value = "";
}

function updateDisplay() {
    let minString = (minute < 10) ? "0" + minute : minute;
    let secString = (second < 10) ? "0" + second : second;
    let countString = (count < 10) ? "0" + count : count;

    document.getElementById("min").innerText = minString;
    document.getElementById("sec").innerText = secString;
    document.getElementById("count").innerText = countString;
}

function stopwatch() {
    timer = setInterval(function() {
        if (running) {
            count++;
            if (count == 100) {
                second++;
                count = 0;
            }
            if (second == 60) {
                minute++;
                second = 0;
            }
            updateDisplay();
        }
    }, 10);
}

function formatTime(minute, second, count) {
    let minString = (minute < 10) ? "0" + minute : minute;
    let secString = (second < 10) ? "0" + second : second;
    let countString = (count < 10) ? "0" + count : count;
    return `${minString}:${secString}:${countString}`;
}

function addRecord(name, timeTaken) {
    let table = document.getElementById("outputTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.rows.length);
    newRow.insertCell(0).textContent = name;
    newRow.insertCell(1).textContent = timeTaken;
}