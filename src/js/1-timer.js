import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

let userSelectedDate = null;

const inputEl = document.querySelector('#datetime-picker');

const btnEl = document.querySelector('[data-start]');
const daysItem = document.querySelector('[data-days]');
const hoursItem = document.querySelector('[data-hours]');
const minutesItem = document.querySelector('[data-minutes]');
const secondsItem = document.querySelector('[data-seconds]');

btnEl.addEventListener('click', startButtonHandler);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateValidtor(selectedDates);
  },
};

function dateValidtor(selectedDates) {
  if (Date.now() < selectedDates[0].getTime()) {
    userSelectedDate = selectedDates[0];
    btnEl.removeAttribute('disabled');
  } else {
    btnEl.setAttribute('disabled', '');
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
  }
}

flatpickr('#datetime-picker', options);

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
  const seconds = String(
    Math.floor((((ms % day) % hour) % minute) / second)
  ).padStart(2, '0');

  return { days, hours, minutes, seconds };
}

function startButtonHandler() {
  const intervalID = setInterval(() => {
    if (userSelectedDate <= Date.now()) {
      clearInterval(intervalID);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(
      userSelectedDate - Date.now()
    );
    daysItem.textContent = addLeadingZero(days);
    hoursItem.textContent = addLeadingZero(hours);
    minutesItem.textContent = addLeadingZero(minutes);
    secondsItem.textContent = addLeadingZero(seconds);
    btnEl.setAttribute('disabled', '');
    inputEl.setAttribute('disabled', '');
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
