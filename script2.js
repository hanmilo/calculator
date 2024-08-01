// functions for calculator
function percent(valueA) {
    return divide(valueA, 100);
};

function plusminus(valueA) {
    return multiply(valueA, -1);
};

function add(valueA, valueB) {
    return Math.round((valueA * decimalPlace) + (valueB * decimalPlace)) / decimalPlace;
};

function subtract(valueA, valueB) {
    return Math.round((valueA * decimalPlace) - (valueB * decimalPlace)) / decimalPlace;
};

function multiply(valueA, valueB) {
    return Math.round((valueA * decimalPlace) * (valueB * decimalPlace)) / (decimalPlace * decimalPlace);
};

function divide(valueA, valueB) {
    return Math.round(valueA * decimalPlace) / Math.round(valueB * decimalPlace);
};

function calculate(valueA, valueB, operator) {
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
            displayOperator.textContent = "";
        };
        // resetPartial
        answer = 0;
    };
    // no mode selected
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

function fixedDigits(valueA) {
// console.log(valueA);
    let digitsMax = 6;
    let valueA_string = (Math.round(valueA % 1 * decimalPlace) / decimalPlace).toString();
// console.log(valueA_string);
    let valueA_Holder = valueA_string.split("");
    if (valueA_Holder.includes(".")) {
// console.log(valueA_Holder.indexOf("."));
        valueA_Holder.splice(valueA_Holder.indexOf("."), 1);
// console.log(valueA_Holder);
        let digits = (valueA_Holder.length - 1 > 0 ? valueA_Holder.length - 1:0);
        return (digits < digitsMax ? digits:digitsMax);
    }
    else {
        return 0;
    };
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
const arrayCalculatorPad = ["AC", 7, 4, 1, "del.", "±", 8, 5, 2, 0,"%", 9, 6, 3, ".", "÷", "x", "+", "-", "="];

var operator = "+";
var valueA = 0;
var valueB = 0;
var answer = 0;
var needOperator = false;
var decimalPlace = Math.pow(10, 9);

const displayInput = document.createElement("h2");
displayInput.classList = "displayInput";
displayInput.textContent = display;
displayRow1.appendChild(displayInput);

const displayOperator = document.createElement("h4");
displayOperator.classList = "displayInput";
// displayOperator.textContent = operator;
displayRow1.appendChild(displayOperator);

for (let i = 0; i < arrayCalculatorPad.length; i++) {
    const buttonPad = document.createElement("button");
    buttonPad.textContent = arrayCalculatorPad[i];

    buttonPad.addEventListener("click", () => {
        if (arrayCalculatorPad[i] == "AC") {
            resetItems("resetAll");
        }
        else if (typeof arrayCalculatorPad[i] === "number") {
            if (needOperator) {
                resetItems("resetAll");
            };
            arrayInput[indexInput] = arrayCalculatorPad[i];
            indexInput++;
            display = arrayInput.join("");
        }
        else if (arrayCalculatorPad[i] === "del.") {
            if (needOperator) {
                resetItems("resetAll");
            }
            else {
                arrayInput.pop();
// console.log(arrayInput);
                if (indexInput > 0) {
                    indexInput--;
                    if (indexInput === 0) {
                        arrayInput[indexInput] = 0;
                    };
                }
                else {
                    arrayInput[indexInput] = 0;
                };
            };
            display = arrayInput.join("");
        }
        else if (arrayCalculatorPad[i] === ".") {
            if (arrayInput.indexOf(arrayCalculatorPad[i]) < 0) {
                if (arrayInput[0] === 0) {
                    arrayInput[indexInput] = "0.";
                }
                else {
                    arrayInput.splice(arrayInput.length, 0, arrayCalculatorPad[i]);
// console.log(arrayInput);
                };
                indexInput++;
                display = arrayInput.join("");
            };
        }
        else if (arrayCalculatorPad[i] === "±" || arrayCalculatorPad[i] === "%") {
            if (needOperator) {
                answer = arrayFunctionOperator[arrayOperator.indexOf(arrayCalculatorPad[i])](valueA);
                if (answer !== 0) {
                    valueA = answer;
                    display = valueA.toFixed(fixedDigits(valueA));
                };
            }
            else {
                answer = arrayFunctionOperator[arrayOperator.indexOf(arrayCalculatorPad[i])](arrayInput.join(""));
                if (answer !== 0) {
                    resetItems();
                    arrayInput[indexInput] = answer;
                    indexInput++;
                    display = arrayInput.join("");
                };
            };
        }
        else if (arrayCalculatorPad[i] === "÷" || arrayCalculatorPad[i] === "x" || arrayCalculatorPad[i] === "+" || arrayCalculatorPad[i] === "-") {            
            if (needOperator) {
                operator = arrayCalculatorPad[i];
                needOperator = false;
                display = valueA.toFixed(fixedDigits(valueA));
                resetItems("resetPartial");
            }
            else {
                valueB = Number(arrayInput.join(""));
                if (operator === "÷" && valueB === 0) {
                    display = "∞ duh...";
                    operator = arrayCalculatorPad[i];
                    resetItems("resetPartial");
                }
                else {
                    valueA = calculate(valueA, valueB, operator);
                    operator = arrayCalculatorPad[i];
                    display = valueA.toFixed(fixedDigits(valueA));
                    // display = valueA;
                    resetItems("resetPartial");
                };
            };
            displayOperator.textContent = operator;
        }
        else if (arrayCalculatorPad[i] === "=") {
            valueB = Number(arrayInput.join(""));
            if (operator === "÷" && valueB === 0) {
                display = "∞ duh...";
                resetItems("resetPartial");
            }
            else {
                valueA = calculate(valueA, valueB, operator);
                display = valueA.toFixed(fixedDigits(valueA));
                // display = valueA;
                displayOperator.textContent = "";
                resetItems("resetPartial");
            };
            needOperator = true;
            
        };
        displayInput.textContent = display;
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
    if (arrayCalculatorPad[i] === "AC" || arrayCalculatorPad[i] === 7 || arrayCalculatorPad[i] === 4 || arrayCalculatorPad[i] === 1 || arrayCalculatorPad[i] === "del.") {
        padRow1.appendChild(buttonPad);
    }
    else if (arrayCalculatorPad[i] === "±" || arrayCalculatorPad[i] === 8 || arrayCalculatorPad[i] === 5 || arrayCalculatorPad[i] === 2 ||  arrayCalculatorPad[i] === 0) {
        padRow2.appendChild(buttonPad);
    }
    else if (arrayCalculatorPad[i] === "%" || arrayCalculatorPad[i] === 9 || arrayCalculatorPad[i] === 6 || arrayCalculatorPad[i] === 3 || arrayCalculatorPad[i] === ".") {
        padRow3.appendChild(buttonPad);
    }
    else if (arrayCalculatorPad[i] === "÷" || arrayCalculatorPad[i] === "x" || arrayCalculatorPad[i] === "-" || arrayCalculatorPad[i] === "+" || arrayCalculatorPad[i] === "=") {
        padRow4.appendChild(buttonPad);
    };
};