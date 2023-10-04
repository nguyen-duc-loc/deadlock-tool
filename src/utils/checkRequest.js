import banker from "./banker";
import { calcAvailable, calcNeed, lte, plus, subtract } from "./helpers";

export default function checkRequest(data, request) {
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

  if (
    !lte(request.resourceRequest, data.processes[request.processIndex].need)
  ) {
    return {
      status: "error",
      errorMessage: "Request > Need",
      available,
      needs: data.processes.map((proc) => {
        return {
          processName: proc.name,
          need: proc.need,
        };
      }),
    };
  }

  if (!lte(request.resourceRequest, data.available)) {
    return {
      status: "error",
      errorMessage: "Request > Available",
      available,
      needs: data.processes.map((proc) => {
        return {
          processName: proc.name,
          need: proc.need,
        };
      }),
    };
  }

  data.processes[request.processIndex].allocation = plus(
    data.processes[request.processIndex].allocation,
    request.resourceRequest
  );
  data.processes[request.processIndex].need = subtract(
    data.processes[request.processIndex].need,
    request.resourceRequest
  );
  data.available = subtract(data.available, request.resourceRequest);

  return banker(data);
}
