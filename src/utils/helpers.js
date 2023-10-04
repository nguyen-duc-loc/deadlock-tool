export function subtract(arr1, arr2) {
  const arr = new Array(arr1.length);
  for (let i = 0; i < arr1.length; i++) {
    arr[i] = arr1[i] - arr2[i];
  }
  return arr;
}

export function plus(arr1, arr2) {
  const arr = new Array(arr1.length);
  for (let i = 0; i < arr1.length; i++) {
    arr[i] = arr1[i] + arr2[i];
  }
  return arr;
}

export function lte(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] > arr2[i]) {
      return false;
    }
  }
  return true;
}

export function findProcess(data, type) {
  return data.processes.findIndex(
    (proc) => lte(proc[type], data.available) && !proc.finish
  );
}

export function calcNeed(data) {
  data.processes.forEach((proc) => {
    proc.need = subtract(proc.max, proc.allocation);
    proc.finish = false;
  });
}

export function calcAvailable(data) {
  const totalAllocations = Array(data.total.length);
  totalAllocations.fill(0);
  data.available = subtract(
    data.total,
    data.processes.reduce(
      (acc, cur) => plus(acc, cur.allocation),
      totalAllocations
    )
  );
}

export function equalToZero(arr) {
  return arr.find((e) => e === 0) === -1;
}
