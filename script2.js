// functions for calculator
function percent(valueA) {
    return divide(valueA, 100);
};

function plusminus(valueA) {
    return valueA * -1;
    // return multiply(valueA, -1);
};

function add(valueA, valueB) {
    return ((valueA * decimalPlace) + (valueB * decimalPlace)) / decimalPlace;
};

function subtract(valueA, valueB) {
    return ((valueA * decimalPlace) - (valueB * decimalPlace)) / decimalPlace;
};

function multiply(valueA, valueB) {
    return ((valueA * decimalPlace) * (valueB * decimalPlace)) / (decimalPlace * decimalPlace);
};

function divide(valueA, valueB) {
    return Math.round(multiply(valueA, Math.pow(10, 9)) / valueB) / Math.pow(10, 9);
};

function calculate(valueA, valueB, operator) {
    let valueHold = ((valueA % 1) >= (valueB % 1)) ? valueA % 1:valueB % 1;
    while (valueHold < 1 && answer > 0) {
        valueHold *= 10;
        decimalPlace *= 10;
    };
    return arrayFunctionOperator[arrayOperator.indexOf(operator)](valueA, valueB);
};

function resetItems(mode) {
    if (mode) {
        if (mode === "resetAll") {
            valueA = 0;
            valueB = 0;
            operator = "+";
            needOperator = false;
            display = 0;
        };
        answer = 0;
        stopDecimal = false;
        decimalPlace = 1;
    }
    indexInput = 0;
    arrayInput = [];
};

// functions for DOM
function appendTop(appendItem) {
    queryTop.appendChild(appendItem);
};

function appendMiddle(appendItem) {
    queryMiddle.appendChild(appendItem);
};

// main
const queryTop = document.querySelector(".top");
const displayRow1 = document.createElement("div");
displayRow1.classList = "displayRow-1";
appendTop(displayRow1);

const queryMiddle = document.querySelector(".middle");
const padRow1 = document.createElement("div");
padRow1.classList = "padRow-1";
appendMiddle(padRow1);
const padRow2 = document.createElement("div");
padRow2.classList = "padRow-2";
appendMiddle(padRow2);
const padRow3 = document.createElement("div");
padRow3.classList = "padRow-3";
appendMiddle(padRow3);
const padRow4 = document.createElement("div");
padRow4.classList = "padRow-4";
appendMiddle(padRow4);

let indexInput = 0;
let arrayInput = [];
let display = 0;

const arrayOperator = ["=", "+", "-", "x", "÷", "±", "%"];
const arrayFunctionOperator = [calculate, add, subtract, multiply, divide, plusminus, percent];
const arrayCalculatorPad = ["AC", 7, 4, 1, 0, "±", 8, 5, 2, "%", 9, 6, 3, ".", "÷", "x", "+", "-", "="];

var operator = "+";
var valueA = 0;
var valueB = 0;
var answer = 0;
var needOperator = false;
var stopDecimal = false;
var decimalPlace = 1;

const displayInput = document.createElement("h2");
displayInput.classList = "displayInput";
displayInput.textContent = display;
displayRow1.appendChild(displayInput);

for (let i = 0; i < arrayCalculatorPad.length; i++) {
    const buttonPad = document.createElement("button");
    buttonPad.textContent = arrayCalculatorPad[i];

    buttonPad.addEventListener("click", () => {
        if (arrayCalculatorPad[i] == "AC") {
            resetItems("resetAll");
        }
        else if (typeof arrayCalculatorPad[i] === "number") {
            arrayInput[indexInput] = arrayCalculatorPad[i];
            indexInput++;
            display = arrayInput.join("");
            // console.log(arrayInput);
        }
        else if (arrayCalculatorPad[i] === ".") {
            if (!stopDecimal) {
                if (indexInput === 0) {
                    arrayInput[indexInput] = "0.";
                }
                else {
                    arrayInput.splice(1, 0, arrayCalculatorPad[i]);
                };
                indexInput++;
                display = arrayInput.join("");
                stopDecimal = true;
            };
        }
        else if (arrayCalculatorPad[i] === "±") {
            answer = plusminus(arrayInput.join(""));
            if (answer !== 0) {
                resetItems();
                arrayInput[indexInput] = answer;
                indexInput++;
                display = arrayInput.join("");
            };
        }
        else if (arrayCalculatorPad[i] === "%") {
            answer = percent(arrayInput.join(""));
            arrayInput = [answer];
            display = arrayInput.join("");
        }
        else if (arrayCalculatorPad[i] === "÷" || arrayCalculatorPad[i] === "x" || arrayCalculatorPad[i] === "+" || arrayCalculatorPad[i] === "-") {            
            if (needOperator) {
                valueA = display;
                operator = arrayCalculatorPad[i];
                needOperator = false;
                display = valueA;
                resetItems("resetPartial");
            }
            else {
                valueB = Number(arrayInput.join(""));
                valueA = calculate(valueA, valueB, operator);

                operator = arrayCalculatorPad[i];
                display = valueA;
                resetItems("resetPartial");
            };
        }
        else if (arrayCalculatorPad[i] === "=") {
            valueB = Number(arrayInput.join(""));
            valueA = calculate(valueA, valueB, operator);
            console.log(valueB);
            needOperator = true;
            display = valueA;
            resetItems("resetPartial");
        };
        displayInput.textContent = display;
        // displayRow1.appendChild(displayInput);
    });

    // Assign different class names to different groups of buttons
    if (arrayCalculatorPad[i] === "AC" || arrayCalculatorPad[i] === "±" || arrayCalculatorPad[i] === "%") {
        buttonPad.classList = "buttonPad-color1";
    }
    else if (arrayCalculatorPad[i] === "÷" || arrayCalculatorPad[i] === "x" || arrayCalculatorPad[i] === "+" || arrayCalculatorPad[i] === "-" || arrayCalculatorPad[i] === "=") {
        buttonPad.classList = "buttonPad-color2";
    }
    else {
        buttonPad.classList = "buttonPad-color3";
    };

    // Sort buttons to designated positions
    if (arrayCalculatorPad[i] === "AC" || arrayCalculatorPad[i] === 7 || arrayCalculatorPad[i] === 4 || arrayCalculatorPad[i] === 1 || arrayCalculatorPad[i] === 0) {
        padRow1.appendChild(buttonPad);
    }
    else if (arrayCalculatorPad[i] === "±" || arrayCalculatorPad[i] === 8 || arrayCalculatorPad[i] === 5 || arrayCalculatorPad[i] === 2 ) {
        padRow2.appendChild(buttonPad);
    }
    else if (arrayCalculatorPad[i] === "%" || arrayCalculatorPad[i] === 9 || arrayCalculatorPad[i] === 6 || arrayCalculatorPad[i] === 3 || arrayCalculatorPad[i] === ".") {
        padRow3.appendChild(buttonPad);
    }
    else if (arrayCalculatorPad[i] === "÷" || arrayCalculatorPad[i] === "x" || arrayCalculatorPad[i] === "-" || arrayCalculatorPad[i] === "+" || arrayCalculatorPad[i] === "=") {
        padRow4.appendChild(buttonPad);
    };
};