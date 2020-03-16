import {
  addDays,
  subDays,
  endOfMonth,
  format,
  startOfToday,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  isAfter,
  isSameDay,
  isSameMonth,
  isWeekend,
  addMonths,
  subMonths
} from "date-fns";

const downloadCalendar = (schedule, families, currentDate, enableWeekends) => {
  console.log(schedule, families);
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  let day = startDate;
  let text = `<div class="calendar"><span class="day-name">Sun</span><span class="day-name">Mon</span><span class="day-name">Tue</span><span class="day-name">Wed</span><span class="day-name">Thu</span><span class="day-name">Fri</span><span class="day-name">Sat</span>`;
  let formattedDate = "";
  while (day <= endDate) {
    let i = 0;
    formattedDate = `${format(day, "M")}/${format(day, "d")}`;
    console.log(formattedDate);
    const cloneDay = day;
    const disabled = isWeekend(cloneDay) && !enableWeekends;

    text += `<div class="day`;
    // assignments.forEach(
    // (famScheduled, i) =>
    // isAvailability(i, cloneDay) && (
    let families = "";
    if (schedule[i].length > 0) {
      for (let a = 0; a < schedule[i].length; a++) {
        if (!enableWeekends & (i % 7 !== 0 && i % 7 !== 6)) {
          families += `
              ${families[schedule[i]]}`;
        } else {
          families += `
              ${families[schedule[i]]}`;
        }
      }
      text += `">${formattedDate}${families}</div>`;
    } else if (i % 7 !== 0 && i % 7 !== 6) {
      text += ` crossed">${formattedDate}</div>`;
    } else {
      text += ` greyed">${formattedDate}</div>`;
    }
    day = addDays(day, 1);
  }

  text += `</div>
  <style>
  html,
  body {
    width: 100%;
    height: 100%;
  }

  body {
    background: #f5f7fa;
    padding: 40px 0;
    box-sizing: border-box;
    font-family: Montserrat, "sans-serif";
    color: #51565d;
  }

  .calendar {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(7, minmax(120px, 1fr));
    grid-template-rows: 50px;
    grid-auto-rows: 120px;
    overflow: auto;
  }

  .day {
    white-space: pre;
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);
    border-right: 1px solid rgba(166, 168, 179, 0.12);
    text-align: right;
    padding: 14px 20px;
    letter-spacing: 1px;
    font-size: 12px;
    box-sizing: border-box;
    color: #98a0a6;
    position: relative;
    pointer-events: none;
    z-index: 1;
  }
  .crossed{
    background-image: linear-gradient(to bottom right,  transparent calc(50% - 1px), red, transparent calc(50% + 1px));
  }
  .greyed{
    background-color: lightGrey;
  }
  </style>
  `;
  const data = new Blob([text], { type: "text/plain" });

  const url = window.URL.createObjectURL(data);

  document.getElementById("download_link").href = url;
};

export default downloadCalendar;
