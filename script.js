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
function appendMiddle() {
    // console.log("appendBody");
    queryMiddle.appendChild(buttonStart);
    // queryMiddle.appendChild(buttonClear);
};

// main
const queryMiddle = document.querySelector(".middle");

let input = 0;
let arrayCalculate = [];
var valueA = 0;
var valueB = 0;
var answer = 0;
const arrayOperator = ["+", "-", "*", "/"];
const arrayFunctionOperator = [add, subtract, multiply, divide];
// const arrayFunctionOperator = [add(valueA, valueB), subtract(valueA, valueB), multiply(valueA, valueB), divide(valueA, valueB)];

const buttonStart = document.createElement("button");
buttonStart.className = "buttonStart";
buttonStart.textContent = "Start";
buttonStart.addEventListener("click", () => {
    input = prompt("calculate: ", "0 + 0");
    arrayCalculate = input.split(" ");
    valueA = arrayCalculate[0];
    operator = arrayCalculate[1];
    valueB = arrayCalculate[2];
    // valueA = Number(prompt("1st Number", 0));
    // operator = prompt("Operator", "+");
    // valueB = Number(prompt("2nd Number", 0));

    for (let i = 0; i < arrayOperator.length; i++) {
        if (operator === arrayOperator[i]) {
            answer = arrayFunctionOperator[i](valueA, valueB);
            alert(valueA + " " + operator + " " + valueB + " = " + answer);
        };
    }
});

// const buttonClear = document.createElement("button");
// buttonClear.className = "buttonClear";
// buttonClear.textContent = "Clear";

appendMiddle();


