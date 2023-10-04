/* eslint-disable react/prop-types */
import { Button, Form, InputNumber } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { increaseProcessNum } from "../problemSlice";

function AddProcessButton(props) {
  const { resourceNum, processNum } = useSelector((store) => store.problem);
  const dispatch = useDispatch();

  const newProcess = {
    key: `process-${processNum}`,
    processName: `Process ${processNum}`,
  };

  for (let i = 0; i < resourceNum; i++) {
    newProcess[`allocation-${i}`] = (
      <Form.Item
        noStyle
        name={["allocation", `allocation-${i}`, newProcess.key]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber name={`allocation-${i}`} min={0} />
      </Form.Item>
    );
    newProcess[`processInfor-${i}`] = (
      <Form.Item
        noStyle
        name={[`processInfor`, `processInfor-${i}`, newProcess.key]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber name={`processInfor-${i}`} min={0} />
      </Form.Item>
    );
  }

  return (
    <Button
      type="dashed"
      shape="round"
      size="large"
      icon={<PlusCircleOutlined />}
      disabled={processNum >= 10}
      onClick={() => {
        props.setProcesses((processes) => [...processes, newProcess]);
        dispatch(increaseProcessNum());
      }}
    >
      Add process
    </Button>
  );
}

export default AddProcessButton;
