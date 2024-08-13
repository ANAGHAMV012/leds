const rowsButton = document.querySelector('.row');
const startButton = document.querySelector('.start');
const delayButton = document.querySelector('.delay');
const stopButton = document.querySelector('.stop');
const inputField = document.querySelector('.input');
const delayInput = document.querySelector('.input2');
const ledsContainer = document.querySelector('.LEDs');

let delay = 500;
let isPaused = false;
let currentRowIndex = 0;
let timeoutId;
rowsButton.addEventListener('click', () => {
  inputField.classList.toggle('active');
  inputField.focus();
});
delayButton.addEventListener('click', () => {
  delayInput.classList.toggle('active');
  delayInput.focus();
});
inputField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
      createRows(parseInt(inputField.value));
      inputField.classList.remove('active');
  }
});
delayInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
      delay = parseInt(delayInput.value) || 500;
      delayInput.classList.remove('active');
  }
});
startButton.addEventListener('click', () => {
  createRows(parseInt(inputField.value));
  delay = parseInt(delayInput.value) || 500;

  if (isPaused) {
      isPaused = false;
      lightenRowsSequentially();
  } else {
      currentRowIndex = 0;
      lightenRowsSequentially();
  }
});
stopButton.addEventListener('click', () => {
    isPaused = true;
    clearTimeout(timeoutId);
});
function createRows(numRows) {
  ledsContainer.innerHTML = '';
  currentRowIndex = 0;
  for (let i = 1; i <= numRows; i++) {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'str show';
      for (let j = 0; j < i; j++) {
          const circleDiv = document.createElement('div');
          circleDiv.className = 'circle';
          rowDiv.appendChild(circleDiv);
      }
      ledsContainer.appendChild(rowDiv);
  }
}
function lightenRowsSequentially() {
  const rows = document.querySelectorAll('.str.show');
  if (!isPaused) {
      if (currentRowIndex < rows.length) {
          const currentRow = rows[currentRowIndex];
          if (currentRowIndex > 0) {
              const prevRow = rows[currentRowIndex - 1];
              prevRow.querySelectorAll('.circle').forEach(circle => {
                  circle.classList.remove('active');
              });
          } else if (currentRowIndex === 0 && rows.length > 1) {
              const lastRow = rows[rows.length - 1];
              lastRow.querySelectorAll('.circle').forEach(circle => {
                  circle.classList.remove('active');
              });
          }
          currentRow.querySelectorAll('.circle').forEach(circle => {
              circle.classList.add('active');
          });
          currentRowIndex++;
      } else {
          currentRowIndex = 0;
      }
      timeoutId = setTimeout(lightenRowsSequentially, delay);
  }
}
const button=document.querySelector('button');
button.addEventListener('click', imaged)
function imaged(){
    const imager = document.getElementById('imager')
    imager.style.display="none"
}