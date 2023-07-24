// const countdownDate = new Date('July 24, 2023 7:28 AM GMT-4').getTime();
// const countdownDate = new Date('July 29, 2023 12:30 AM UTC-5').getTime();
const countdownDate = new Date('July 29, 2023 12:30 AM EST').getTime();

// Selectors
const daysEl = document.querySelector('.countdown-timer-container #days');
const hoursEl = document.querySelector('.countdown-timer-container #hours');
const minutesEl = document.querySelector('.countdown-timer-container #minutes');
const secondsEl = document.querySelector('.countdown-timer-container #seconds');

// Countdown
setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // always show with 2 digits
  days = days.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;

  // After the countdown has finished
  if (distance < 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
  }
}, 1000);
