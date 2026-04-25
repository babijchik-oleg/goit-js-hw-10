import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// 1. Оголошення змінних та пошук елементів
let userSelectedDate = null;
let timerId = null;

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minsEl = document.querySelector('[data-minutes]');
const secsEl = document.querySelector('[data-seconds]');

// Кнопка старт спочатку неактивна
startBtn.disabled = true;

const style = document.createElement('style');
style.innerHTML = `
/* Основний контейнер для полів вводу */
.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
}

#datetime-picker {
  width: 272px;
  height: 40px;
  padding: 8px 16px;
  border: 1px solid #808080;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  outline: none;
}
#datetime-picker:disabled {
  background: #fafafa;
  color: #989898;
  border-color: #808080;
}

#datetime-picker:hover {
  border-color: #000;
}

#datetime-picker:focus {
  border-color: #4e75ff;
}

/* Кнопка Start */
button[data-start] {
  width: 75px;
  height: 40px;
  background: #4e75ff;
  border-radius: 8px;
  color: #fff;
  border: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  cursor: pointer;
}

button[data-start]:disabled {
  background: #cfcfcf;
  color: #989898;
  cursor: not-allowed;
}
  button[data-start]:not(:disabled):hover {
  background-color: #6c8cff;
}

/* Таймер */
.timer {
  display: flex;
  gap: 24px;
}

.field {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.value {
  font-family: 'Montserrat', sans-serif;
  font-size: 40px;
  line-height: 1.2;
  letter-spacing: 0.04em;
  color: #2e2f42;
}

.label {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  color: #2e2f42;
}

/* Контейнер календаря */
.flatpickr-calendar {
  background: #f5f5f5;
  border-radius: 4px;
  box-shadow: none;
  border: 1px solid #808080;
  font-family: 'Montserrat', sans-serif;
}

/* Місяць та рік */
.flatpickr-month {
  color: #2e2f42;
  fill: #2e2f42;
}

.flatpickr-current-month .flatpickr-monthDropdown-months {
    font-weight: 600;
}

/* Дні тижня */
span.flatpickr-weekday {
  color: #2e2f42;
  font-weight: 500;
}

/* Звичайний день (hover) */
.flatpickr-day:hover {
  background: #e2e2e2;
  border-color: transparent;
}

/* Сьогоднішній день (коло, як на макеті) */
.flatpickr-day.today {
  border-color: #4e75ff;
  color: #2e2f42;
}
.flatpickr-day.today:hover {
  background: #4e75ff;
  color: #fff;
}

/* Обраний день (СИНЄ КОЛО як у Figma) */
.flatpickr-day.selected, 
.flatpickr-day.selected:hover, 
.flatpickr-day.selected:focus {
  background: #4e75ff;
  border-color: #4e75ff;
  color: #fff;
  box-shadow: none;
  border-radius: 50%; /* Робимо ідеальне коло */
}

/* Вибір часу знизу */
.flatpickr-time {
  border-top: 1px solid #808080;
}

.flatpickr-time input {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
}`;
document.head.appendChild(style);

// 2. Налаштування Flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    // Валідація дати
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Illegal operation! Please choose a date in the future.',
        position: 'topRight',
        backgroundColor: '#ef4040',
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: '#fff',
      });
      startBtn.disabled = true;
      userSelectedDate = null;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

flatpickr(input, options);

// 3. Обробка натискання на кнопку Start
startBtn.addEventListener('click', () => {
  // Блокуємо інтерфейс
  startBtn.disabled = true;
  input.disabled = true;

  // Запускаємо інтервал
  timerId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = userSelectedDate - currentTime;

    // Перевірка завершення таймера
    if (deltaTime <= 0) {
      clearInterval(timerId);
      updateTimerInterface(0, 0, 0, 0);
      input.disabled = false; // Робимо інпут знову активним
      return;
    }

    // Розрахунок часу та оновлення інтерфейсу
    const time = convertMs(deltaTime);
    updateTimerInterface(time.days, time.hours, time.minutes, time.seconds);
  }, 1000);
});

// 4. Функція форматування (додавання нуля)
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// 5. Оновлення значень на екрані
function updateTimerInterface(d, h, m, s) {
  daysEl.textContent = addLeadingZero(d);
  hoursEl.textContent = addLeadingZero(h);
  minsEl.textContent = addLeadingZero(m);
  secsEl.textContent = addLeadingZero(s);
}

// 6. Функція підрахунку (з вашого ТЗ)
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
