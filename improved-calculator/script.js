document.addEventListener('DOMContentLoaded', function () {
  const keys = document.querySelector('.calculator-keys');
  const display = document.querySelector('.calculator-screen');

  const buttons = [
    { text: 'AC', value: 'all-clear', class: 'all-clear' },
    { text: '+/-', value: '+/-', class: 'negative' },
    { text: '%', value: '%', class: 'percent' },
    { text: '/', value: '/', class: 'operator' },
    { text: '7', value: '7', class: '' },
    { text: '8', value: '8', class: '' },
    { text: '9', value: '9', class: '' },
    { text: '*', value: '*', class: 'operator' },
    { text: '4', value: '4', class: '' },
    { text: '5', value: '5', class: '' },
    { text: '6', value: '6', class: '' },
    { text: '-', value: '-', class: 'operator' },
    { text: '1', value: '1', class: '' },
    { text: '2', value: '2', class: '' },
    { text: '3', value: '3', class: '' },
    { text: '+', value: '+', class: 'operator' },
    { text: '0', value: '0', class: '' },
    { text: '.', value: '.', class: 'operator' },
    { text: '=', value: '=', class: 'operator' },
  ];

  buttons.forEach((button) => {
    let btn = document.createElement('button');

    btn.innerText = button.text;
    // btn.setAttribute(button.value);
    btn.value = button.value;

    if (button.class) {
      btn.classList.add(button.class);
    }

    keys.appendChild(btn);
  });

  let displayValue = '0';
  let firstValue = null;
  let operator = null;
  let waitingForSecondValue = false;
  const operations = {
    '+': (value) => handleOperator(value),
    '-': (value) => handleOperator(value),
    '*': (value) => handleOperator(value),
    '/': (value) => handleOperator(value),
    '.': (value) => inputDecimal(value),
    '+/-': (value) => negative(value),
    '%': (value) => percent(value),
    '=': () => calculate(),
    'all-clear': () => clear(),
  };

  const calculateObject = {
    '+': (firstValue, secondValue) => firstValue + secondValue,
    '-': (firstValue, secondValue) => firstValue - secondValue,
    '*': (firstValue, secondValue) => firstValue * secondValue,
    '/': (firstValue, secondValue) => secondValue === '0' ? "Second Value can't be 0" : firstValue / secondValue,
  };
  
  updateDisplay();

  keys.addEventListener('click', function (e) {
    let element = e.target;
    const value = element.value;
    if (!element.matches('button')) return;

    let number = +value;

    if (typeof number === 'number' && number === number) {
      inputNumber(value);
    } else {
      operations[value](value);
    }
    updateDisplay();
  });

  function updateDisplay() {
    display.value = displayValue;
  }

  function clear() {
    displayValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    updateDisplay();
  }

  function inputNumber(num) {
    if (waitingForSecondValue) {
      displayValue = num;
      waitingForSecondValue = false;
    } else {
      console.log(displayValue);
      displayValue = displayValue === '0' ? num : displayValue + num;
    }
  }

  function negative() {
    displayValue = ((displayValue) * -1).toString();
  }
  
  function percent() {
    displayValue = ((displayValue) / 100).toString();
  }

  function inputDecimal(dot) {
    if (!displayValue.includes(dot)) {
      displayValue += dot;
    }
  }

  function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);
    if (operator && waitingForSecondValue) {
      operator = nextOperator;
      return;
    }
    if (firstValue === null) {
      firstValue = value;
    } else if (operator) {
      const result = performCalculation(operator, firstValue, value);
      displayValue = String(result);
      firstValue = result;
    }
    waitingForSecondValue = true;
    operator = nextOperator;
  }

  function performCalculation(operator, firstValue, secondValue) {
    return calculateObject[operator](firstValue, secondValue);
  }

  function calculate() {
    if (!operator) {
      return;
    }

    const secondValue = parseFloat(displayValue);
    console.log(firstValue, secondValue, operator);
    const result = performCalculation(operator, firstValue, secondValue);
    displayValue = String(result);
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
  }
});
