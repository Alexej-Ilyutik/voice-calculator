const arrKeys = [
  { name: 'square', value: 'x&#178;' },
  { name: 'seven', value: '7' },
  { name: 'eight', value: '8' },
  { name: 'nine', value: '9' },
  { name: 'divide', value: '/' },
  { name: 'percent', value: '%' },
  { name: 'mathRoot', value: '&radic;' },
  { name: 'four', value: '4' },
  { name: 'five', value: '5' },
  { name: 'six', value: '6' },
  { name: 'multiply', value: '*' },
  { name: 'minus', value: '-' },
  { name: 'backspace', value: 'CE' },
  { name: 'one', value: '1' },
  { name: 'two', value: '2' },
  { name: 'three', value: '3' },
  { name: 'plus', value: '+' },
  { name: 'equals', value: '=' },
  { name: 'clear', value: 'C' },
  { name: 'zero', value: '0' },
  { name: 'doubleZero', value: '00' },
  { name: 'dot', value: '.' },
];
const output = document.querySelector('.result__output-value');
const keyboard = document.querySelector('.calculator__keyboard');
const calculator = document.querySelector('.calculator');

arrKeys.forEach((obj) => {
  keyboard.insertAdjacentHTML(
    'beforeend',
    `<button class="calculator__key ${obj.name}" data-key="${obj.name}" value="${obj.value}">${obj.value}</button>`
  );
  calculator.insertAdjacentHTML(
    'beforeend',
    `<audio id="${obj.name}" src="./assets/sounds/${obj.name}.mp3"></audio>`
  );
});

document.querySelectorAll('.calculator__key').forEach((button) => {
  button.addEventListener('click', function (e) {
    calc(this.value);
    playKey(e);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key.match(/[0-9%\/*\-+=]|Backspace|Enter/)) calc(event.key);
});

function error(Newtext) {
  let oldVal = output.textContent.substring(0, output.textContent.length - 2);
  output.textContent = Newtext;
  setTimeout(() => {
    output.textContent = oldVal;
  }, 1500);
}


function calc(value) {
  if (output.textContent.length > 13) {
    const newVal = 'Max length - 12!';
    error(newVal);
  }
  
  if (value.match(/=|Enter/)) {
    try {
      output.textContent = eval(output.textContent);
      if (output.textContent.length > 13) {
        alert(`The result is too big: ${output.textContent}!`);
        output.textContent = output.textContent.substring(0, 12);
      }
      setTimeout(playResult, 800);
    } catch {
      let newValue = 'Invalid expression';
      error(newValue);
    }
  } else if (value === 'C') {
    output.textContent = '';
  } else if (value.match(/CE|Backspace/)) {
    output.textContent = output.textContent.substring(
      0,
      output.textContent.length - 1
    );
  } else if (value === '√') {
    output.textContent = Math.sqrt(output.textContent);
    if (output.textContent.length > 13) {
      alert(`The result is too big: ${output.textContent}!`);
      output.textContent = output.textContent.substring(0, 12);
    }
    setTimeout(playResult, 900);
  } else if (value === 'x²') {
    output.textContent = Math.pow(output.textContent, 2);
    if (output.textContent.length > 13) {
      alert(`The result is too big: ${output.textContent}!`);
      output.textContent = output.textContent.substring(0, 12);
    }
    setTimeout(playResult, 800);
  } else if (value === '%') {
    output.textContent = eval(output.textContent) / 100;
    setTimeout(playResult, 800);
  } else {
    output.textContent += value;
  }
}

function playKey(e) {
  let key = e.target;
  let sound = document.getElementById(key.dataset.key);
  sound.play();
}

function playResult() {
  let res = [...output.textContent];
  res.forEach((el, i) => {
    setTimeout(function () {
      let soundName = arrKeys.find((obj) => obj.value === el).name;
      let soundRes = document.getElementById(soundName);
      soundRes.currentTime = 0;
      soundRes.play();
    }, 1000 * ++i);
  });
}

// const HISTORY_VAL = document.querySelector('.result__history-value');
// const RESULT_VAL = document.querySelector('.result__output-value');

// function getHistory() {
//   return HISTORY_VAL.innerHTML;
// }

// function printHistory(value) {
//   HISTORY_VAL.innerHTML = value;
// }

// function getResult() {
//   return RESULT_VAL.innerHTML;
// }

// function printResult(value) {
//   RESULT_VAL.innerHTML = value;
// }

// let operator = document.getElementsByClassName('operator');
// for (let i = 0; i < operator.length; i++) {
//   operator[i].addEventListener('click', function (){
//     if (this.id == 'clear') {
//       printHistory('');
//       printResult('');
//     } else if (this.id == 'backspace') {
//       let output = getResult().toString();
//       if (output) {
//         output = output.substring(0, output.length - 1);
//         printResult(output);
//       }
//     } else {
//       let output = getResult();
//       let history = getHistory();
//       if (output === '' && history !== '') {
//         if (isNaN(history[history.length - 1])) {
//           history = history.substring(0, history.length - 1);
//         }
//       }
//       if (output !== '' || history !== '') {
//         output = output == '' ? output : reverseNumberFormat(output);
//         history = history + output;
//         if (this.id == '=') {
//           var result = eval(history);
//           printOutput(result);
//           printHistory('');
//         } else {
//           history = history + this.id;
//           printHistory(history);
//           printOutput('');
//         }
//       }
//     }
//   });
// }

// let number = document.getElementsByClassName('number');
// for (let i = 0; i < number.length; i++) {
//   number[i].addEventListener('click', function () {
//     let output = getResult();
//     if (output != NaN) {
//       //if output is a number
//       output = output + this.id;
//       printResult(output);
//     }
//   });
// }
