import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{f as h,i as b}from"./assets/vendor-BbbuE1sJ.js";let a=null,d=null;const s=document.querySelector("#datetime-picker"),r=document.querySelector("[data-start]"),y=document.querySelector("[data-days]"),k=document.querySelector("[data-hours]"),x=document.querySelector("[data-minutes]"),g=document.querySelector("[data-seconds]");r.disabled=!0;const l=document.createElement("style");l.innerHTML=`
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
}`;document.head.appendChild(l);const w={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){const t=e[0];t<=new Date?(b.error({title:"Error",message:"Please choose a date in the future",position:"topRight",backgroundColor:"#ef4040",titleColor:"#fff",messageColor:"#fff",iconColor:"#fff"}),r.disabled=!0,a=null):(a=t,r.disabled=!1)}};h(s,w);r.addEventListener("click",()=>{r.disabled=!0,s.disabled=!0,d=setInterval(()=>{const t=a-new Date;if(t<=0){clearInterval(d),c(0,0,0,0),s.disabled=!1;return}const o=M(t);c(o.days,o.hours,o.minutes,o.seconds)},1e3)});function n(e){return String(e).padStart(2,"0")}function c(e,t,o,i){y.textContent=n(e),k.textContent=n(t),x.textContent=n(o),g.textContent=n(i)}function M(e){const f=Math.floor(e/864e5),u=Math.floor(e%864e5/36e5),p=Math.floor(e%864e5%36e5/6e4),m=Math.floor(e%864e5%36e5%6e4/1e3);return{days:f,hours:u,minutes:p,seconds:m}}
//# sourceMappingURL=1-timer.js.map
