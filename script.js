// functions in calculator
// function add(arrayValues) {
//     return arrayValues.reduce((result, currentValue) => result + currentValue, 0);
// };

// function subtract(arrayValues) {
//     return arrayValues.reduce((result, currentValue) => result - currentValue, 0);
// };

// function multiply(arrayValues) {
//     return arrayValues.reduce((result, currentValue) => result * currentValue, 0);
// };

// function divide(arrayValues) {
//     return arrayValues.reduce((result, currentValue) => result / currentValue, 0);
// };

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

function calculate(arrayValues, arrayOperatorInput) {
    var answer = 0;
    let arrayValuesHolder = arrayValues;

    for (let indexOperatorInput = 0; indexOperatorInput < arrayOperatorInput.length; indexOperatorInput++) {
        for (let i = 1; i < arrayOperator.length; i++) {
            if (arrayOperatorInput[indexOperatorInput] == arrayOperator[i]) {
                answer = arrayFunctionOperator[i](arrayValuesHolder[0], arrayValuesHolder[1]);
                arrayValues.splice(0, 1, answer);
            };
        };
    };
    return answer;
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
    indexShow = 0;
    arrayShow = [];
    answer = 0;
    arrayOperatorInput = [];
    indexOperatorInput = 0;
}

// main
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
const displayRow1 = document.createElement("div");
displayRow1.classList = "displayRow-1";
appendMiddle(displayRow1);

let indexInput = 0;
let arrayInput = [];
let indexCalculate = 0;
let arrayCalculate = [];
let indexShow = 0;
let arrayShow = [];
let arrayOperatorInput = [];
let indexOperatorInput = 0;
const arrayOperator = ["=", "+", "-", "*", "/"];
const arrayFunctionOperator = [calculate, add, subtract, multiply, divide];
const arrayCalculatorKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "C"];
const arrayCalculatorPad = arrayCalculatorKeys.concat(arrayOperator);
var answer = 0;
// console.log(arrayCalculator);

const displayInput = document.createElement("h2");
displayInput.classList = "displayInput";
// displayInput.textContent = arrayInput;
// displayRow1.appendChild(displayInput);

for (let i = 0; i < arrayCalculatorPad.length; i++) {
    const buttonPad = document.createElement("button");
    buttonPad.classList = "buttonPad";
    buttonPad.textContent = arrayCalculatorPad[i];
    buttonPad.addEventListener("click", () => {
        if (i < 10) {   // Number button pressed
            arrayInput[indexInput] = arrayCalculatorPad[i];
            arrayShow[indexShow] = arrayInput[indexInput];

            indexInput++;
            indexShow++;
        }
        else if (i == 10) { // "clear" button pressed
            clearAll();
        }
        else if (i == 11) { // "=" button pressed
            arrayCalculate[indexCalculate] = Number(arrayInput.join(""));
            // indexCalculate++;
            answer = calculate(arrayCalculate, arrayOperatorInput);
            arrayShow[indexShow] = "=";
            indexShow++;
            arrayShow[indexShow] = answer;
            // alert(arrayCalculate[0] + " " + operator + " " + arrayCalculate[1] + " = " + answer);
            // clearAll();
        }
        else {  // operator button pressed
            arrayCalculate[indexCalculate] = Number(arrayInput.join(""));
            indexCalculate++;

            arrayOperatorInput[indexOperatorInput] = arrayCalculatorPad[i];

            arrayShow[indexShow] = arrayOperatorInput[indexOperatorInput];
            indexOperatorInput++;
            indexShow++;

            arrayInput = [];
            indexInput = 0;
        };
        console.log(arrayShow);

        displayInput.textContent = arrayShow.join("");
        displayRow1.appendChild(displayInput);
    });

    if (i < 4) {
        padRow1.appendChild(buttonPad);
    }
    else if (i < 8) {
        padRow2.appendChild(buttonPad);
    }
    else if (i < 12) {
        padRow3.appendChild(buttonPad);
    }
    else {
        padRow4.appendChild(buttonPad);
    };
};


