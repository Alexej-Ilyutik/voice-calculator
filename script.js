const arrKeys = [
  { square: 'x&#178;' },
  { seven: '7' },
  { eight: '8' },
  { nine: '9' },
  { divide: '/' },
  { percent: '%' },
  { mathRoot: '&radic;' },
  { four: '4' },
  { five: '5' },
  { six: '6' },
  { multiply: '*' },
  { minus: '-' },
  { backspace: 'CE' },
  { one: '1' },
  { two: '2' },
  { three: '3' },
  { plus: '+' },
  { equals: '=' },
  { clear: 'C' },
  { zero: '0' },
  { doubleZero: '00' },
  { dot: '.' },
];
const output = document.querySelector('.result__output-value');
const keyboard = document.querySelector('.calculator__keyboard');
const calculator = document.querySelector('.calculator');

arrKeys.map((obj) => {
  for (let key in obj) {
    keyboard.insertAdjacentHTML(
      'beforeend',
      `<button class="calculator__key ${key}" data-key="${key}" value="${obj[key]}">${obj[key]}</button>`
    );
     calculator.insertAdjacentHTML(
       'beforeend',
       `<audio id="${key}" src="./assets/sounds/${key}.mp3"></audio>`
     );

  }
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

function calc(value) {
  if (value.match(/=|Enter/)) {
    try {
      output.textContent = eval(output.textContent);
    } catch {
      let oldValue = output.textContent;

      let newValue = 'недопустимое выражение';

      output.textContent = newValue;

      setTimeout(() => {
        output.textContent = oldValue;
      }, 1500);
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
  } else if (value === 'x²') {
    output.textContent = Math.pow(output.textContent, 2);
  } else if (value === '%') {
    output.textContent = eval(output.textContent) / 100;
  } else {
    output.textContent += value;
  }
}


function playKey(e) {
  let key = e.target;
  console.log(key);
  let sound = document.getElementById(key.dataset.key);
  console.log(sound);
  sound.play();
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
