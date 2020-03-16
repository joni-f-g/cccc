import React, { useState } from "react";
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
import alg from "../algorithm.js";
import downloadCalendar from "../download.js";

import Family from "./Family.js";

const Calendar = () => {
  const today = startOfToday();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(monthStart);
  const endDate = endOfWeek(monthEnd);
  const [availabilities, setAvailabilities] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [latestDate, setLatestDate] = useState(endDate);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentFamily, setCurrentFamily] = useState(null);
  const [familyNames, setFamilyNames] = useState(null);
  const [enableWeekends, setEnableWeekends] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const isAvailability = (index, day) => {
    const dayAfterToday = addDays(today, index);
    if (isSameDay(day, dayAfterToday) && !(isWeekend(day) && !enableWeekends)) {
      return true;
    }
    return false;
  };

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
      const disabled = isWeekend(day) && !enableWeekends;
      days.push(
        <th
          key={i}
          style={disabled ? { background: "lightgrey" } : {}}
          className={disabled ? "disabled" : "cell"}
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
        const disabled = isWeekend(cloneDay) && !enableWeekends;
        days.push(
          <td
            style={disabled ? { background: "lightgrey" } : {}}
            className={disabled ? "disabled" : "cell"}
            key={day}
            onClick={() => currentFamily && onDateClick(cloneDay)}
          >
            {isSameDay(cloneDay, startOfMonth(cloneDay)) && (
              <div className="nextMonth">{format(cloneDay, "MMM")}</div>
            )}
            <div className="availContainer">
              {!showSchedule &&
                availabilities.map(
                  (fam, i) =>
                    isUnavailable(fam, cloneDay) && (
                      <div
                        key={`unavailable${i}`}
                        className={`unavailable color${i + 1}`}
                      />
                    )
                )}
              {showSchedule &&
                assignments.map(
                  (famScheduled, i) =>
                    isAvailability(i, cloneDay) && (
                      <div
                        key={`available${cloneDay}`}
                        className={`unavailable color${famScheduled + 1}`}
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
    if (currentFamily && !(isWeekend(day) && !enableWeekends)) {
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
      if (isAfter(day, latestDate)) {
        setLatestDate(day);
      }
    }
  };

  const onHeaderClick = day => {
    if (currentFamily && !(isWeekend(day) && !enableWeekends)) {
      let weekday = day;
      const availabilityUpdate = availabilities;
      if (!isAfter(weekday, today)) {
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
      if (isAfter(subDays(weekday, 7), latestDate)) {
        setLatestDate(subDays(weekday, 7));
      }
    }
  };

  return (
    <>
      <h3>{header()}</h3>
      <button onClick={() => setEnableWeekends(!enableWeekends)}>
        {enableWeekends ? "Disable Weekends" : "Enable Weekends"}
      </button>
      <table>
        <thead>{days()}</thead>
        <tbody>{cells()}</tbody>
      </table>
      <Family
        setAvailabilities={avail => setAvailabilities(avail)}
        setCurrentFamily={fam => setCurrentFamily(fam)}
        setFamilyNames={fams => setFamilyNames(fams)}
      />
      {!!availabilities.length && (
        <>
          <button
            onClick={() => {
              setAssignments(
                alg.generateSchedule(availabilities, latestDate)[0]
              );
              setShowSchedule(true);
            }}
          >
            Create Schedule
          </button>
          <button onClick={() => setShowSchedule(!showSchedule)}>
            {showSchedule ? "Change Availabilities" : "Show Schedule"}
          </button>
          <a
            id="download_link"
            download="schedule.html"
            href=""
            onClick={() =>
              downloadCalendar(
                assignments,
                familyNames,
                currentDate,
                enableWeekends
              )
            }
          >
            Download Schedule
          </a>
          <button onClick={() => {}}>Generate Link</button>
        </>
      )}
    </>
  );
};

export default Calendar;
