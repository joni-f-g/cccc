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
import Instructions from "./Instructions.js";

import "./Calendar.css";

const colors = [
  "#f37942",
  "#a85ca0",
  "#87c1f7",
  "#10237e",
  "#007c14",
  "#eb4636",
  "#eb12e2"
];

const Calendar = ({ locale }) => {
  let instructions;
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
      instructions = "Instrucciones";
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
      instructions = "使用指南";
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
      instructions = "Instruções";
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
      instructions = "Anleitung";
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
      instructions = "Instructions";
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
      instructions = "Οδηγίες";
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
      instructions = "Instructions";
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
    search.currentDate ? new Date(search.currentDate) : new Date()
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

  const getCellStyle = (day, disabled) => {
    let style = "";
    if (disabled) {
      style = "lightgrey";
    } else if (!isAfter(day, today) && !isSameDay(day, today)) {
      style = "#d3d3d33b";
    } else if (!showSchedule) {
      const dividend = 100 / availabilities.length;
      style = "linear-gradient(to bottom,";
      availabilities.forEach((fam, i) => {
        if (isUnavailable(fam, day)) {
          if (i === 0) {
            style += ` ${colors[i]} ${dividend * 1}%`;
          } else {
            style += ` ${colors[i]} ${dividend * i}%, ${colors[i]} ${dividend *
              (i + 1)}%`;
          }
        } else {
          if (i === 0) {
            style += ` white ${dividend * 1}%`;
          } else {
            style += ` white ${dividend * i}%, white ${dividend * (i + 1)}%`;
          }
        }
        if (i + 1 === availabilities.length) {
          style += ")";
        } else {
          style += ",";
        }
      });
    } else {
      assignments.forEach((famScheduled, i) => {
        if (isAvailability(famScheduled, i, day)) {
          style = colors[famScheduled];
        }
      });
    }
    return { background: style };
  };

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
          className={disabled ? "disabled" : "weekday"}
          onClick={() => onHeaderClick(day)}
        >
          {format(day, dateFormat, { locale })}
        </th>
      );
    }
    return <tr>{days}</tr>;
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
        days.push(
          <td
            style={getCellStyle(cloneDay, disabled)}
            className={disabled ? "disabled" : "day"}
            key={day}
            onClick={() => currentFamily && onDateClick(cloneDay)}
          >
            {isSameDay(cloneDay, startOfMonth(cloneDay)) && (
              <div className="nextMonth">
                {format(cloneDay, "MMM", { locale })}
              </div>
            )}
            <span>{formattedDate}</span>
          </td>
        );
        day = addDays(day, 1);
      }
      rows.push(<tr key={day}>{days}</tr>);
      days = [];
    }
    return rows;
  };

  const nextMonth = () => {
    setCurrentDate(startOfMonth(addMonths(currentDate, 1)));
    setLatestDate(endOfWeek(endOfMonth(addMonths(currentDate, 1))));
  };

  const prevMonth = () => {
    setCurrentDate(startOfMonth(subMonths(currentDate, 1)));
    setLatestDate(endOfWeek(endOfMonth(subMonths(currentDate, 1))));
  };

  const onDateClick = day => {
    if (
      currentFamily &&
      !(isWeekend(day) && !enableWeekends) &&
      !showSchedule &&
      (isSameDay(day, startOfWeek(currentDate)) ||
        isAfter(day, startOfWeek(currentDate)))
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
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(monthStart);
      const endDate = endOfWeek(monthEnd);
      let weekday = day;
      const availabilityUpdate = availabilities;
      if (
        !isAfter(weekday, startOfWeek(currentDate)) &&
        !isSameDay(weekday, startOfWeek(currentDate))
      ) {
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
    <>
      <div className="row Instructions">
        <div className="w-100 col-xs-12">
          <div className="dropdown show">
            <div
              className="w-100 btn instructions"
              data-toggle="collapse"
              href="#instructions"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              {instructions}
            </div>
            <div className="collapse" id="instructions">
              <div className="card card-body">
                <Instructions lang={locale} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Calendar">
        <div className="row Calendar-Top">
          <div className="col-xs-12 col-md-3 New-Sched">
            <div id="reset" className="text-btn">
              + Start New Schedule
            </div>
          </div>
          <div className="col-md-9 Calendar-Nav">
            <div className="row">
              <div id="prev" className="text-btn chev" onClick={prevMonth}>
                <i className="fas fa-chevron-left" />
              </div>
              <div id="next" className="text-btn chev" onClick={nextMonth}>
                <i className="fas fa-chevron-right" />
              </div>
              <div id="week" className="dropdown date">
                {format(currentDate, "MMM yyyy", { locale })}
              </div>
              <div id="right-top-cal-options" className="ml-auto">
                <input
                  type="button"
                  id="schedule"
                  className="ml-auto btn btn-primary"
                  value={createSchedule}
                  onClick={() => {
                    setAssignments(
                      alg.generateSchedule(availabilities, latestDate)[0]
                    );
                    setShowSchedule(true);
                  }}
                />
                <input
                  type="button"
                  id="schedule"
                  className="btn btn-outline-primary showSchedule"
                  value={showSchedule ? scheduleYes : scheduleNo}
                  onClick={() => setShowSchedule(!showSchedule)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row Current-Edit">
          <div className="col-md-3" />
          <div className="col-md-9">
            <div className="form-inline">
              <label htmlFor="current-family">
                Editing unavailability for:
              </label>
              <div
                className={`current-family ${
                  currentFamily ? `currentFamily${currentFamily.id}` : ""
                }`}
                id="current-family"
              >
                {currentFamily && currentFamily.value}
              </div>
            </div>
          </div>
        </div>
        <div className="row Calendar-Main">
          <Family
            familyNames={familyNames}
            locale={locale}
            setAvailabilities={avail => setAvailabilities(avail)}
            setCurrentFamily={fam => setCurrentFamily(fam)}
            setFamilyNames={fams => setFamilyNames(fams)}
            setShowSchedule={res => setShowSchedule(res)}
          />
          <div className="col-md-9">
            <table id="av_cal" className="cal table table-bordered">
              <colgroup>
                <col className="weekend" />
                <col className="weekday" span="5" />
                <col className="weekend" />
              </colgroup>
              <thead>{days()}</thead>
              <tbody>{cells()}</tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-xs-12 col-md-9">
            <div className="row">
              <div
                id="reset"
                role="button"
                tabIndex="0"
                className="text-btn"
                onClick={() => setEnableWeekends(!enableWeekends)}
              >
                {enableWeekends ? weekendsNo : weekendsYes}
              </div>
              <input
                type="button"
                id="schedule"
                className="ml-auto btn btn-primary"
                value={createSchedule}
                onClick={() => {
                  setAssignments(
                    alg.generateSchedule(availabilities, latestDate)[0]
                  );
                  setShowSchedule(true);
                }}
              />
            </div>
            <hr className="solid" />
            <div id="links">
              <a
                type="button"
                id="download-schedule"
                className="w-100 btn btn-info link"
                style={{ background: "#7C1AB9" }}
                href=""
                download="schedule.html"
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
              <input
                type="button"
                id="copy-link"
                className="w-100 btn btn-info link"
                value={shareLink ? linkCopied : linkCalendar}
                onClick={() => generateLink()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
