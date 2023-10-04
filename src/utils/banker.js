import {
  calcAvailable,
  calcNeed,
  findProcess,
  plus,
  subtract,
} from "./helpers";

export default function banker(data) {
  if (!data.processes[0].need) {
    calcNeed(data);
  }

  data.processes.forEach((proc) => {
    proc.finish = false;
  });

  if (!data.available) {
    calcAvailable(data);
  }

  const available = data.available;

  const activities = [];

  let processIndex = findProcess(data, "need");
  while (processIndex !== -1) {
    const activity = {};
    const proc = data.processes[processIndex];
    proc.finish = true;
    proc.allocation = plus(proc.allocation, proc.need);
    data.available = subtract(data.available, proc.need);
    data.available = plus(data.available, proc.allocation);
    proc.allocation.fill(0);
    activity.selectedProcess = proc.name;
    activity.finish = data.processes.map((proc) => proc.finish);
    activity.available = data.available;
    activities.push(activity);
    processIndex = findProcess(data, "need");
  }

  return {
    status: !data.processes.map((proc) => proc.finish).includes(false)
      ? "safe"
      : "unsafe",
    activities,
    available,
    needs: data.processes.map((proc) => {
      return {
        processName: proc.name,
        need: proc.need,
      };
    }),
  };
}
