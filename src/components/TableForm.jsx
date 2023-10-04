import { Col, Form, Row, Space } from "antd";
import ResourceInputTable from "./ResourceInputTable";
import ProcessTableInput from "./ProcessInputTable";
import SolveButton from "./SolveButton";
import banker from "../utils/banker";
import { useDispatch, useSelector } from "react-redux";
import {
  showResult,
  updateAvailable,
  updateNeeds,
  updateRequests,
  updateResult,
} from "../resultSlice";
import RequestInputTable from "./RequestInputTable";
import checkRequest from "../utils/checkRequest";
import detection from "../utils/detection";

function TableForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {
    processInforType,
    resourceNum,
    processNum,
    resourceInforType,
    request,
    requestProcess,
    problemType,
  } = useSelector((store) => store.problem);

  function handleFinish(values) {
    const processIds = Object.keys(values.allocation["allocation-0"]).map(
      (procKey) => procKey.split("-")[1]
    );
    const processNames = processIds.map((id) => `Process ${id}`);
    const data = {
      processes: [...Array(processNum)],
    };
    data[resourceInforType] = Object.values(values[resourceInforType]);
    for (let i = 0; i < processNum; i++) {
      data.processes[i] = {};
      data.processes[i].name = processNames[i];
      data.processes[i].allocation = [];
      data.processes[i][processInforType] = [];
      for (let j = 0; j < resourceNum; j++) {
        data.processes[i].allocation.push(
          values.allocation[`allocation-${j}`][`process-${processIds[i]}`]
        );
        data.processes[i][processInforType].push(
          values.processInfor[`processInfor-${j}`][`process-${processIds[i]}`]
        );
      }
    }

    if (problemType === "banker") {
      if (!request) {
        const { status, activities, available, needs } = banker(data);
        dispatch(updateResult(status, activities));
        dispatch(updateNeeds(needs));
        dispatch(updateAvailable(available));
      } else {
        const requestData = {
          processIndex: requestProcess,
          resourceRequest: Object.values(values.request),
        };
        const { status, activities, errorMessage, available, needs } =
          checkRequest(data, requestData);
        dispatch(updateResult(status, activities, errorMessage));
        dispatch(updateNeeds(needs));
        dispatch(updateAvailable(available));
      }
    } else {
      const { status, available, activities, requests } = detection(data);
      dispatch(updateResult(status, activities));
      dispatch(updateRequests(requests));
      dispatch(updateAvailable(available));
    }

    dispatch(showResult());
  }

  return (
    <Form form={form} onFinish={handleFinish}>
      <Row justify="space-evenly">
        <Col>
          <ProcessTableInput />
        </Col>

        <Col>
          <Space direction="vertical" size="large" align="center">
            <ResourceInputTable />
            {problemType === "banker" && <RequestInputTable />}
            <SolveButton />
          </Space>
        </Col>
      </Row>
    </Form>
  );
}

export default TableForm;
