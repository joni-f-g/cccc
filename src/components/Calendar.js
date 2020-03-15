import React, { useState } from "react";
import {
  addDays,
  endOfMonth,
  format,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  isAfter,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths
} from "date-fns";

import Family from "./Family.js";

const Calendar = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentFamily, setCurrentFamily] = useState(null);

  const isUnavailable = (family, day) =>
    family.some(unavailableDay => isSameDay(unavailableDay, day));

  const header = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div style={{ display: "flex" }}>
        <div className="icon" onClick={prevMonth}>
          {`<-`}
        </div>
        <div>
          <span>{format(currentDate, dateFormat)}</span>
        </div>
        <div className="icon" onClick={nextMonth}>
          {`->`}
        </div>
      </div>
    );
  };
  const days = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      days.push(
        <th
          key={i}
          className="column col-center"
          onClick={() => onHeaderClick(day)}
        >
          {format(day, dateFormat)}
        </th>
      );
    }
    return <tr className="days row">{days}</tr>;
  };
  const cells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <td
            className="cell"
            key={day}
            onClick={() => currentFamily && onDateClick(cloneDay)}
          >
            {isSameDay(cloneDay, startOfMonth(cloneDay)) && (
              <div className="nextMonth">{format(cloneDay, "MMM")}</div>
            )}
            <div className="availContainer">
              {availabilities.map(
                (fam, i) =>
                  isUnavailable(fam, cloneDay) && (
                    <div
                      key={`tinycircle${i}`}
                      className={`tinyCircle color${i + 1}`}
                    />
                  )
              )}
            </div>

            <span>{formattedDate}</span>
          </td>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <tr className="row" key={day}>
          {days}
        </tr>
      );
      days = [];
    }
    return rows;
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const onDateClick = day => {
    if (currentFamily) {
      const availabilityUpdate = availabilities;
      if (availabilities[currentFamily.id].some(d => isSameDay(d, day))) {
        const indexToRemove = availabilityUpdate[currentFamily.id].findIndex(
          d => isSameDay(d, day)
        );
        availabilityUpdate[currentFamily.id].splice(indexToRemove, 1);
      } else {
        availabilityUpdate[currentFamily.id].push(day);
      }
      setAvailabilities([...availabilityUpdate]);
    }
  };

  const onHeaderClick = day => {
    if (currentFamily) {
      let weekday = day;
      const availabilityUpdate = availabilities;
      if (!isAfter(weekday, currentDate)) {
        weekday = addDays(weekday, 7);
      }
      while (isSameMonth(weekday, currentDate)) {
        const cloneDay = weekday;
        if (
          availabilities[currentFamily.id].some(d => isSameDay(d, cloneDay))
        ) {
          const indexToRemove = availabilityUpdate[currentFamily.id].findIndex(
            d => isSameDay(d, cloneDay)
          );
          availabilityUpdate[currentFamily.id].splice(indexToRemove, 1);
        } else {
          availabilityUpdate[currentFamily.id].push(cloneDay);
        }
        weekday = addDays(weekday, 7);
      }
      setAvailabilities([...availabilityUpdate]);
    }
  };

  return (
    <>
      <h3>{header()}</h3>
      <table>
        <thead>{days()}</thead>
        <tbody>{cells()}</tbody>
      </table>
      <Family
        setAvailabilities={avail => setAvailabilities(avail)}
        setCurrentFamily={fam => setCurrentFamily(fam)}
      />
    </>
  );
};

export default Calendar;
