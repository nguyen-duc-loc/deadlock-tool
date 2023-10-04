import {
  calcAvailable,
  equalToZero,
  findProcess,
  plus,
  subtract,
} from "./helpers";

export default function detection(data) {
  data.processes.forEach((proc) => {
    if (equalToZero(proc.allocation) && equalToZero(proc.request)) {
      proc.finish = true;
    } else {
      proc.finish = false;
    }
  });

  if (!data.available) {
    calcAvailable(data);
  }

  const available = data.available;
  const activities = [];

  let processIndex = findProcess(data, "request");
  while (processIndex !== -1) {
    const activity = {};
    const proc = data.processes[processIndex];
    proc.finish = true;
    proc.allocation = plus(proc.allocation, proc.request);
    data.available = subtract(data.available, proc.request);
    data.available = plus(data.available, proc.allocation);
    proc.allocation.fill(0);
    activity.selectedProcess = proc.name;
    activity.finish = data.processes.map((proc) => proc.finish);
    activity.available = data.available;
    activities.push(activity);
    processIndex = findProcess(data, "request");
  }

  return {
    status: !data.processes.map((proc) => proc.finish).includes(false)
      ? "no deadlock"
      : "deadlock",
    activities,
    available,
    requests: data.processes.map((proc) => {
      return {
        processName: proc.name,
        request: proc.request,
      };
    }),
  };
}
