// functions in calculator
function add(valueA, valueB) {
    return valueA + valueB;
};

function subtract(valueA, valueB) {
    return valueA - valueB;
};

function multiply(valueA, valueB) {
    return valueA * valueB;
};

function divide(valueA, valueB) {
    return valueA / valueB;
};

// functions in background
function appendBody() {
    // console.log("appendBody");
    queryBody.appendChild(buttonStart);
    queryBody.appendChild(buttonClear);
};

// main
const queryMiddle = document.querySelector(".middle");
queryMiddle.className = "queryMiddle";

const buttonStart = document.createElement("button");
buttonStart.className = "buttonStart";
buttonStart.textContent = "Start";

const buttonClear = document.createElement("button");
buttonClear.className = "buttonClear";
buttonClear.textContent = "Clear";


