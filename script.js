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
      setTimeout(() => {
        let res = [...output.textContent];
        playResult(res);
      }, 800);
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

function playResult(arr) {
  arr.forEach((el, i) => {
    setTimeout(function () {
      let soundName = arrKeys.find((obj) => obj.value === el).name;
      let soundRes = document.getElementById(soundName);
      soundRes.currentTime = 0;
      soundRes.play();
    }, 1000 * ++i);
  });
}

const microphone = document.getElementById('mic');
const tooltip = document.querySelector('.tooltip');

microphone.onclick = function () {
  microphone.src = './assets/mic2.svg';
  microphone.classList.remove('mic');
  microphone.classList.add('mic__record');
  tooltip.classList.add('tooltip__active');
  let recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function (event) {
    let input = event.results[0][0].transcript;
    console.log(input);
    output.textContent = input;
    setTimeout(function () {
      evaluate(input);
    }, 1500);
    microphone.src = './assets/mic.svg';
    microphone.classList.remove('mic__record');
    microphone.classList.add('mic');
    tooltip.classList.remove('tooltip__active');
  };
};

function evaluate(input) {
  try {
    let result = eval(input);
    let arrVoice = input.split('');
    arrVoice.push('=');
    let arrResult = String(result).split('');
    arrVoice = [...arrVoice, ...arrResult];
    arrVoice = arrVoice.filter((entry) => entry.trim() != '');
    output.textContent = result;
    playResult(arrVoice);
  } catch (e) {
    let newValue = 'Invalid expression';
    output.textContent = newValue;
    setTimeout(() => {
      output.textContent = '';
    }, 1500);
  }
}
