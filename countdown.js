document.addEventListener('DOMContentLoaded', () => {
    const daysElement = document.querySelector('[counter-el="days"]');
    const hoursElement = document.querySelector('[counter-el="hours"]');
    const minutesElement = document.querySelector('[counter-el="minutes"]');
    const secondsElement = document.querySelector('[counter-el="seconds"]');
    const eventDateStr = document.querySelector('[counter-el="start-date"]').textContent.trim();

    const TIMEZONE = 'America/New_York'; // Timezone

    const parseInTimezone = (dateStr, timeZone) => {
      const parts = new Date(dateStr);
      if (isNaN(parts.getTime())) return null;

      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      const [{ value: month }, , { value: day }, , { value: year }, , { value: hour }, , { value: minute }, , { value: second }] =
        formatter.formatToParts(parts);
      return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    };

    const targetDate = parseInTimezone(eventDateStr, TIMEZONE);

    if (!targetDate) {
      console.error('Invalid date:', eventDateStr);
      [daysElement, hoursElement, minutesElement, secondsElement].forEach((el) => {
        if (el) el.textContent = '--';
      });
    } else {
      let previousValues = { days: '', hours: '', minutes: '', seconds: '' };

      const pad = (num) => num.toString().padStart(2, '0');

      const updateCountdown = () => {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
          [daysElement, hoursElement, minutesElement, secondsElement].forEach((el) => {
            if (el) el.textContent = '00';
          });
          clearInterval(intervalId);
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        const newValues = {
          days: pad(days),
          hours: pad(hours),
          minutes: pad(minutes),
          seconds: pad(seconds),
        };

        if (newValues.days !== previousValues.days) daysElement.textContent = newValues.days;
        if (newValues.hours !== previousValues.hours) hoursElement.textContent = newValues.hours;
        if (newValues.minutes !== previousValues.minutes) minutesElement.textContent = newValues.minutes;
        if (newValues.seconds !== previousValues.seconds) secondsElement.textContent = newValues.seconds;

        previousValues = newValues;
      };

      updateCountdown();
      const intervalId = setInterval(updateCountdown, 1000);
    }
  });
