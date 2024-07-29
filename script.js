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

function calculate(valueA, valueB, operator) {
    for (let i = 1; i < arrayOperator.length; i++) {
        if (operator == arrayOperator[i]) {
            return arrayFunctionOperator[i](valueA, valueB);
        }
    }
};

// functions in background
function appendMiddle(appendItem) {
    queryMiddle.appendChild(appendItem);
};

function clearAll() {
    indexInput = 0;
    arrayInput = [];
    indexCalculate = 0;
    arrayCalculate = [];
    answer = 0;
    operator = "+";
}

// main
const queryMiddle = document.querySelector(".middle");

let indexInput = 0;
let arrayInput = [];
let indexCalculate = 0;
let arrayCalculate = [];
const arrayOperator = ["=", "+", "-", "*", "/"];
const arrayFunctionOperator = [calculate, add, subtract, multiply, divide];
const arrayCalculatorKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "clear"];
const arrayCalculatorPad = arrayCalculatorKeys.concat(arrayOperator);
var answer = 0;
var operator = "+";
// console.log(arrayCalculator);

for (let i = 0; i < arrayCalculatorPad.length; i++) {
    const buttonPad = document.createElement("button");
    buttonPad.className = "buttonPad";
    buttonPad.textContent = arrayCalculatorPad[i];
    buttonPad.addEventListener("click", () => {
        // input = prompt("calculate: ", "0 + 0");
        // arrayCalculate = input.split(" ");
        // valueA = arrayCalculate[0];
        // operator = arrayCalculate[1];
        // valueB = arrayCalculate[2];
        // valueA = Number(prompt("1st Number", 0));
        // operator = prompt("Operator", "+");
        // valueB = Number(prompt("2nd Number", 0));

        // console.log(typeof Number(arrayCalculatorPad));
        if (i < 10) {   // Number button pressed
            arrayInput[indexInput] = arrayCalculatorPad[i];
            console.log(arrayInput);
            indexInput++;
        }
        else if (i == 10) { // "clear" button pressed
            clearAll();
        }
        else if (i == 11) { // "=" button pressed
            arrayCalculate[indexCalculate] = Number(arrayInput.join(""));
            // indexCalculate++;
            answer = calculate(arrayCalculate[0], arrayCalculate[1], operator);
                alert(arrayCalculate[0] + " " + operator + " " + arrayCalculate[1] + " = " + answer);
            clearAll();
        }
        else {  // operator button pressed
            arrayCalculate[indexCalculate] = Number(arrayInput.join(""));
            indexCalculate++;
            console.log(arrayCalculate);

            operator = arrayCalculatorPad[i];

            arrayInput = [];
            indexInput = 0;
        };
    });
    appendMiddle(buttonPad);
};


