import {
  addDays,
  endOfMonth,
  format,
  startOfToday,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  isSameDay,
  isWeekend
} from "date-fns";

const downloadCalendar = (schedule, families, currentDate, enableWeekends) => {
  const today = startOfToday();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const isAvailability = (index, day) => {
    const dayAfterToday = addDays(today, index);
    if (isSameDay(day, dayAfterToday) && !(isWeekend(day) && !enableWeekends)) {
      return true;
    }
    return false;
  };
  let day = startDate;
  let text = `<div class="calendar"><span class="day-name">Sun</span><span class="day-name">Mon</span><span class="day-name">Tue</span><span class="day-name">Wed</span><span class="day-name">Thu</span><span class="day-name">Fri</span><span class="day-name">Sat</span>`;
  let formattedDate = "";
  while (day <= endDate) {
    formattedDate = `${format(day, "M")}/${format(day, "d")}`;
    const cloneDay = day;
    const disabled = isWeekend(cloneDay) && !enableWeekends;

    text += `<div class="day`;
    let familyText = "";
    let isFamScheduled = false;
    if (disabled) {
      text += ` greyed">${formattedDate}</div>`;
    } else {
      schedule.forEach((famScheduled, i) => {
        if (isAvailability(i, cloneDay)) {
          isFamScheduled = true;
          familyText += `
          ${families[famScheduled].value}`;
        }
      });
      if (isFamScheduled) {
        text += `">${formattedDate}${familyText}</div>`;
      } else if (!isWeekend(cloneDay)) {
        text += ` crossed">${formattedDate}</div>`;
      }
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
