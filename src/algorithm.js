import solver from "javascript-lp-solver";
import { addDays, isAfter, isSameDay, startOfToday } from "date-fns";

const alg = {
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
        model.variables[vn] = {}; // add the variable to the model
        model.variables[vn][vns] = 1;
        model.variables[vn][vw_max] = 1;
        model.variables[vn][vw_min] = 1;
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

    /* choose a fair allocation at random
               a fair allocation has each worker working (ndays/nworkers) total days, rounded up or down
               such that the total number of days worked in the allocation is equal to the total number of days
               and which workers have their allocations rounded up is chosen uniformly at random */
    var fairalloc = {};
    var fairallocfloor = Math.floor(ndays / nworkers);
    for (iworker = 0; iworker < nworkers; iworker += 1) {
      fairalloc[iworker] = fairallocfloor;
    }
    var alloceddays = fairallocfloor * nworkers;
    while (alloceddays < ndays) {
      let iw = Math.ceil(Math.random() * nworkers);
      if (fairalloc[iw] == fairallocfloor) {
        fairalloc[iw] += 1;
        alloceddays += 1;
      }
    }

    /* for each worker */
    let minmaxar = ["min", "max"];
    for (let c of minmaxar) {
      for (iworker = 0; iworker < nworkers; iworker += 1) {
        let vw = c + "totalw" + iworker;
        for (var jslack = 0; jslack < JSLACK_MAX; jslack += 1) {
          let sw = c + "slackw" + iworker + "index" + jslack; // a "slack" variable for the worker
          let sw_max = c + "swmax" + iworker + "index" + jslack;
          let sw_min = c + "swmin" + iworker + "index" + jslack;
          model.variables[sw] = {}; // add the slack variable

          if (c == "min") {
            model.variables[sw][vw] = 1; // constrain that the total days worked
          } else {
            model.variables[sw][vw] = -1; // constrain that the total days worked
          }

          model.variables[sw][sw_max] = 1;
          model.variables[sw][sw_min] = 1;
          model.variables[sw]["unfairness"] = jslack * 2 + 1; // the unfairness is the sum of slack variables
          if (jslack != JSLACK_MAX - 1) {
            model.constraints[sw_max] = { max: 1 }; //constrain to less (or equal to) than 1
          }
          model.constraints[sw_min] = { min: 0 }; //constrain to more (or equal to) than 0
          /* constrain that the number of days worked for each worker minus the slack variable for that worker is
                           no greater than the fair allocation for that worker
                           i.e. the slack variable encodes the number of "extra" days worked by that worked beyond their fair allocation */
        }
        if (c == "min") {
          model.constraints[vw] = { min: fairalloc[iworker] };
        } else {
          model.constraints[vw] = { max: fairalloc[iworker] };
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
    // const numOfDays = differenceInCalendarDays(latestDate, new Date()) + 1;
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

export default alg;
