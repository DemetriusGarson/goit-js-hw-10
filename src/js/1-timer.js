import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  inputDateTime: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
};

refs.inputDateTime.removeAttribute('disabled');
refs.startButton.setAttribute('disabled', 'true');
let userSelectedDate;
// let currentDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < Date.now()) {
      refs.startButton.setAttribute('disabled', 'true');
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      refs.startButton.removeAttribute('disabled');
    }
  },
};

flatpickr(refs.inputDateTime, options);

console.log(currentDate);

refs.startButton.addEventListener('click', onStartButtonClick);

function onStartButtonClick(event) {
  refs.startButton.setAttribute('disabled', 'true');
  refs.inputDateTime.setAttribute('disabled', 'ture');
  const intervalId = setInterval(() => {
    if (Date.now() >= userSelectedDate) {
      clearInterval(intervalId);
    } else {
      const remainTime = userSelectedDate.getTime() - Date.now();
      updateTimer(remainTime);
    }
  }, 1000);
}
// !!!!!!!!!!!!!!!!!
function updateTimer(remainTime) {
  const convertedDate = convertMs(remainTime);
}
//!!!!!!!!!!!!!
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
