import React, { useState } from "react";
import {
  addDays,
  addWeeks,
  subDays,
  endOfMonth,
  format,
  startOfToday,
  startOfWeek,
  startOfMonth,
  startOfYear,
  endOfWeek,
  isAfter,
  isSameDay,
  isWeekend,
  addMonths,
  subMonths
} from "date-fns";
import { alg, downloadCalendar } from "../helper.js";
import QueryString from "query-string";

import Family from "./Family.js";

import "./Calendar.css";

const Calendar = ({ locale }) => {
  let weekendsNo;
  let weekendsYes;
  let scheduleYes;
  let scheduleNo;
  let createSchedule;
  let downloadSchedule;
  let linkCalendar;
  let linkCopied;

  switch (locale ? locale.code : "en-US") {
    case "es":
      weekendsNo = "Fin de Semanas NO";
      weekendsYes = "Fin de Semanas SI";
      scheduleYes = "Cambiar Disponibilidad";
      scheduleNo = "Muestra Horario";
      createSchedule = "crear horario";
      downloadSchedule = "descargar horario";
      linkCalendar = "enlace a horario";
      linkCopied = "enlace es copiado";
      break;
    case "zh-CN":
      weekendsNo = "不包括周末";
      weekendsYes = "包括周末";
      scheduleYes = "修改日程";
      scheduleNo = "展示日程";
      createSchedule = "创建日程";
      downloadSchedule = "下载日程";
      linkCalendar = "链接日程";
      linkCopied = "链接已复制";
      break;
    case "pt":
      weekendsNo = "Fins-de-semana NÃO";
      weekendsYes = "Fins-de-semana SIM";
      scheduleYes = "Mudar disponibilidades";
      scheduleNo = "Mostrar horário";
      createSchedule = "Criar horário";
      downloadSchedule = "Fazer download do horário";
      linkCalendar = "Fazer link do calendário";
      linkCopied = "Link copiado";
      break;
    case "de":
      weekendsNo = "Wochenenden NEIN";
      weekendsYes = "Wochenenden JA";
      scheduleYes = "Terminplaner Verügbarkeit";
      scheduleNo = "Terminplaner anzeigen";
      createSchedule = "Zeitplan erstellen";
      downloadSchedule = "Zeitplan herunterladen";
      linkCalendar = "Verknüpfe Kalendar";
      linkCopied = "Link kopiert";
      break;
    case "fr":
      weekendsNo = "Weekends NON";
      weekendsYes = "Weekends OUI";
      scheduleYes = "Changer Mes Disponibilités";
      scheduleNo = "Montrer l'Emploi du Temps";
      createSchedule = "Créer En Emploi du Temps";
      downloadSchedule = "Télécharger l'Horaire";
      linkCalendar = "Lien à l'Emploi du Temps";
      linkCopied = "Lien Copié";
      break;
    case "el":
      weekendsNo = "Σ/Κ Μη ενεργοποιημένα";
      weekendsYes = "Σ/Κ Ενεργοποιημένα";
      scheduleYes = "Άλλαξτε διαθεσιμότητα";
      scheduleNo = "Δείξτε το πρόγραμμα";
      createSchedule = "Δημιουγία προγράμματος";
      downloadSchedule = "Κατέβαστε το πρόγραμμα";
      linkCalendar = "Σύνδεση ημερολογίου";
      linkCopied = "Αντιγραφή συνδέσμου";
      break;
    default:
      weekendsNo = "Disable Weekends";
      weekendsYes = "Enable Weekends";
      scheduleYes = "Change Availabilities";
      scheduleNo = "Show Schedule";
      createSchedule = "Create Schedule";
      downloadSchedule = "Download Schedule";
      linkCalendar = "Generate Link";
      linkCopied = "✔ Link Copied!";
  }

  const today = startOfToday();
  console.log(startOfWeek(addWeeks(startOfYear(today), 12)));
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(monthStart);
  const endDate = endOfWeek(monthEnd);
  const search = QueryString.parse(window.location.search);
  const [availabilities, setAvailabilities] = useState(
    search.availabilities ? JSON.parse(search.availabilities) : []
  );
  const [assignments, setAssignments] = useState(search.assignments || []);
  const [latestDate, setLatestDate] = useState(endDate);
  const [currentDate, setCurrentDate] = useState(
    search.currentDate
      ? new Date(search.currentDate)
      : search.week
        ? startOfWeek(addWeeks(startOfYear(today), 12))
        : new Date()
  );
  const [familyNames, setFamilyNames] = useState(
    search.familyNames ? JSON.parse(search.familyNames) : null
  );
  const [enableWeekends, setEnableWeekends] = useState(
    search.enableWeekends ? search.enableWeekends === "true" : false
  );
  const [showSchedule, setShowSchedule] = useState(
    search.showSchedule || false
  );
  const [currentFamily, setCurrentFamily] = useState(
    familyNames ? familyNames[0] : null
  );
  const [shareLink, setShareLink] = useState(null);
  if (search.week) {
  }

  const isAvailability = (fam, index, day) => {
    const dayAfterToday = addDays(today, index);
    if (
      isSameDay(day, dayAfterToday) &&
      !(isWeekend(day) && !enableWeekends) &&
      fam >= 0
    ) {
      return true;
    }
    return false;
  };

  const isUnavailable = (family, day) =>
    family.some(unavailableDay => isSameDay(unavailableDay, day));

  const generateLink = () => {
    const link = shareLink
      ? null
      : window.location.origin +
        "/?" +
        QueryString.stringify({
          availabilities: JSON.stringify(availabilities),
          assignments,
          currentDate,
          familyNames: JSON.stringify(familyNames),
          enableWeekends,
          showSchedule
        });
    setShareLink(link);
    navigator.clipboard.writeText(link || "");
  };

  const header = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div style={{ display: "flex" }}>
        <div className="icon" onClick={prevMonth}>
          {`<-`}
        </div>
        <div>
          <span>{format(currentDate, dateFormat, { locale })}</span>
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
          {format(day, dateFormat, { locale })}
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
        formattedDate = format(day, dateFormat, { locale });
        const cloneDay = day;
        const disabled = isWeekend(cloneDay) && !enableWeekends;
        const getCellStyle = () => {
          if (disabled) {
            return { background: "lightgrey" };
          }
          if (!isAfter(cloneDay, today) && !isSameDay(cloneDay, today)) {
            return { background: "#d3d3d33b" };
          } else {
            return {};
          }
        };
        days.push(
          <td
            style={getCellStyle()}
            className={disabled ? "disabled" : "cell"}
            key={day}
            onClick={() => currentFamily && onDateClick(cloneDay)}
          >
            {isSameDay(cloneDay, startOfMonth(cloneDay)) && (
              <div className="nextMonth">
                {format(cloneDay, "MMM", { locale })}
              </div>
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
                    isAvailability(famScheduled, i, cloneDay) && (
                      <div
                        key={`available${cloneDay}`}
                        className={`unavailable color${parseInt(famScheduled) +
                          1}`}
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
    if (
      currentFamily &&
      !(isWeekend(day) && !enableWeekends) &&
      !showSchedule &&
      (isSameDay(day, today) || isAfter(day, today))
    ) {
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
    if (
      currentFamily &&
      !(isWeekend(day) && !enableWeekends) &&
      !showSchedule
    ) {
      let weekday = day;
      const availabilityUpdate = availabilities;
      if (!isAfter(weekday, today) && !isSameDay(weekday, today)) {
        weekday = addDays(weekday, 7);
      }
      while (weekday <= endDate) {
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
    <div className="calendar">
      <div className="calContainer">
        <h3>{header()}</h3>
        <button onClick={() => setEnableWeekends(!enableWeekends)}>
          {enableWeekends ? weekendsNo : weekendsYes}
        </button>
        <table>
          <thead>{days()}</thead>
          <tbody>{cells()}</tbody>
        </table>
        <Family
          familyNames={familyNames}
          locale={locale}
          setAvailabilities={avail => setAvailabilities(avail)}
          setCurrentFamily={fam => setCurrentFamily(fam)}
          setFamilyNames={fams => setFamilyNames(fams)}
          setShowSchedule={res => setShowSchedule(res)}
        />
      </div>
      {!!availabilities.length && (
        <div className="actions">
          <button
            onClick={() => {
              setAssignments(
                alg.generateSchedule(availabilities, latestDate)[0]
              );
              setShowSchedule(true);
            }}
          >
            {createSchedule}
          </button>
          <button onClick={() => setShowSchedule(!showSchedule)}>
            {showSchedule ? scheduleYes : scheduleNo}
          </button>
          <button>
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
              {downloadSchedule}
            </a>
          </button>
          <button onClick={() => generateLink()}>
            {shareLink ? linkCopied : linkCalendar}
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
