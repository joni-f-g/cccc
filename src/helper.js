import {
  addDays,
  isAfter,
  isSameDay,
  startOfToday,
  endOfMonth,
  format,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  isWeekend
} from "date-fns";
const solver = window.solver;

export const alg = {
  shuffle: a => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  },
  computeSchedule: (nworkers, workerAvailability) => {
    var JSLACK_MAX = 7;

    /* construct a model to be solved later */
    var model = {
      optimize: "unfairness", // objective is to minimize unfairness
      opType: "min",
      constraints: {},
      variables: {},
      ints: {}
    };

    var ardays = [];
    for (let iday = 0; iday < workerAvailability.length; iday += 1) {
      ardays.push(iday);
    }
    alg.shuffle(ardays); //shuffle for better randomization

    var ndays = 0; // tracks total days currently entered in optimization problem, increments each time a new day is added
    // note that days with no availability for any worker will not be added into the solver
    for (let iday of ardays) {
      let day = workerAvailability[iday];
      day = alg.shuffle(day); //shuffle the workers in the days
      for (var iworker = 0; iworker < day.length; iworker++) {
        let availableWorker = day[iworker];
        //create a variable like 'assignedp2d13' which will be 1 if the parent is assigned that day, 0 otherwsie
        let vn = "assignedw" + availableWorker + "d" + iday; // 'assignedp2d13'
        let vns = "aw" + availableWorker + "d" + iday; // a short name of the variable, used to constrain it to be non-negative
        let vw_min = "mintotalw" + availableWorker; // a  max constraint for the total work done by this worker
        let vw_max = "maxtotalw" + availableWorker; // a min constraint for the total work done by this worker
        let vd = "totald" + iday; // a constraint for the total number of workers that work this day

        // add variables to model
        model.variables[vn] = {};
        model.variables[vn][vns] = 1;
        model.variables[vn][vw_max] = 1; //will set relevant constraint later
        model.variables[vn][vw_min] = 1; //will set relevant constraint later
        model.variables[vn][vd] = 1;
        model.constraints[vns] = { min: 0 }; // constrain that this work variable is non-negative
        model.ints[vn] = 1; // specify that this variable should be an integer

        if (!model.constraints.hasOwnProperty(vd)) {
          // if we haven't seen this day yet
          model.constraints[vd] = { equal: 1 }; // constrain that the number of workers that work this day is exactly 1
          ndays += 1; // and add 1 to our counter for the total number of days in the problem
        }
      }
    }

    let fairalloc = ndays / nworkers;
    let fairallocround = Math.round(fairalloc);

    /* for each worker */
    let minmaxar = ["min", "max"];
    for (let c of minmaxar) {
      for (iworker = 0; iworker < nworkers; iworker += 1) {
        let vw = c + "totalw" + iworker;
        for (var jslack = 0; jslack < JSLACK_MAX; jslack += 1) {
          let sw = c + "slackw" + iworker + "index" + jslack; // a "slack" variable for the worker
          let sw_max = c + "swmax" + iworker + "index" + jslack; //constraint variable for max on slack var
          let sw_min = c + "swmin" + iworker + "index" + jslack; //min

          model.variables[sw] = {}; // add the slack variable
          model.variables[sw][sw_max] = 1;
          model.variables[sw][sw_min] = 1;

          if (c == "min") {
            model.variables[sw][vw] = 1; // constrain that the total days worked
          } else {
            model.variables[sw][vw] = -1; // constrain that the total days worked
          }

          if (c == "max") {
            model.variables[sw]["unfairness"] =
              Math.pow(fairallocround + jslack + 1 - fairalloc, 2) -
              Math.pow(fairallocround + jslack - fairalloc, 2);
          } else {
            model.variables[sw]["unfairness"] =
              Math.pow(fairallocround - jslack - 1 - fairalloc, 2) -
              Math.pow(fairallocround - jslack - fairalloc, 2);
          }
          if (jslack != JSLACK_MAX - 1) {
            model.constraints[sw_max] = { max: 1 }; //constrain to less (or equal to) than 1
          }
          model.constraints[sw_min] = { min: 0 }; //constrain to more (or equal to) than 0
        }
        if (c == "min") {
          model.constraints[vw] = { min: fairallocround };
        } else {
          model.constraints[vw] = { max: fairallocround };
        }
      }
    }

    /* log some stuff to the console, for debugging */
    console.log("model:", model);

    /* solve the problem */
    var results = solver.Solve(model);
    console.log("solved: ", results);

    let outputs = [];
    for (let iday = 0; iday < workerAvailability.length; iday += 1) {
      outputs[iday] = -1; //initialize assignment to 0
    }
    if (results.feasible) {
      /* for each day, assign it the appropriate classes for its assignment */
      for (let iday = 0; iday < workerAvailability.length; iday += 1) {
        for (iworker = 0; iworker < nworkers; iworker += 1) {
          let vn = "assignedw" + iworker + "d" + iday;
          if (results[vn] == 1) {
            outputs[iday] = iworker;
            break;
          }
        }
      }
      console.log("assignments: ", outputs);
    } else {
      console.log("No assignment possible due to solver error.");
      return [null, 0];
    }
    return [outputs, results.result];
  },
  generateSchedule: (unavailabilities, latestDate) => {
    const availabilities = [];
    const numberOfFamilies = unavailabilities.length;
    let day = startOfToday();
    while (!isAfter(day, latestDate)) {
      const cloneDay = day;
      const availabilityOnDay = unavailabilities.reduce((acc, curr, i) => {
        if (!curr.some(unavailableDay => isSameDay(unavailableDay, cloneDay))) {
          acc.push(i);
        }
        return acc;
      }, []);
      day = addDays(day, 1);
      availabilities.push(availabilityOnDay);
    }
    return alg.computeSchedule(numberOfFamilies, availabilities);
  }
};

export const downloadCalendar = (
  schedule,
  families,
  currentDate,
  enableWeekends
) => {
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
