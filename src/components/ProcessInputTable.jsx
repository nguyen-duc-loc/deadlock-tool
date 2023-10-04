/* eslint-disable react/prop-types */
import { Button, Form, InputNumber, Select, Table } from "antd";
import SelectResourceNum from "./SelectResourceNum";
import { useEffect, useState } from "react";
import AddProcessButton from "./AddProcessButton";
import { MinusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseProcessNum,
  updateProcessInforType,
  updateProcessNum,
} from "../problemSlice";

const defaultProcessNum = 4;

function ProcessTableInput() {
  const [processes, setProcesses] = useState([]);
  const dispatch = useDispatch();
  const { resourceNum, processInforType, problemType, processNum } =
    useSelector((store) => store.problem);

  useEffect(() => {
    const procs = [];
    for (let i = 0; i < defaultProcessNum; i++) {
      procs.push({
        key: `process-${i}`,
        processName: `Process ${i}`,
      });
      for (let j = 0; j < resourceNum; j++) {
        procs[i][`allocation-${j}`] = (
          <Form.Item
            noStyle
            name={["allocation", `allocation-${j}`, `process-${i}`]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber name={`allocation-${j}`} min={0} />
          </Form.Item>
        );
        procs[i][`processInfor-${j}`] = (
          <Form.Item
            noStyle
            name={[`processInfor`, `processInfor-${j}`, `process-${i}`]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber name={`processInfor-${j}`} min={0} />
          </Form.Item>
        );
      }
    }
    setProcesses(procs);
    dispatch(updateProcessNum(procs.length));
  }, [resourceNum, dispatch]);

  function handleDeleteProcess(processId) {
    dispatch(decreaseProcessNum());
    setProcesses((processes) => processes.filter((p) => p.key !== processId));
  }

  const columns = [
    {
      key: "delete",
      dataIndex: "delete",
      rowSpan: 2,
      render: (_, record) =>
        Number(record.key.split("-")[1]) === processNum - 1 ? (
          <Button
            size="small"
            icon={<MinusOutlined />}
            disabled={processNum === 1}
            onClick={() => handleDeleteProcess(record.key)}
            danger
          />
        ) : null,
      align: "center",
    },
    {
      title: "Process",
      dataIndex: "processName",
      key: "processName",
      rowScope: "row",
      align: "center",
    },
    {
      title: "Allocation",
      dataIndex: "allocation",
      key: "allocation",
      children: [...Array(resourceNum)].map((_, index) => {
        return {
          title: `${String.fromCharCode(index + "A".charCodeAt(0))}`,
          dataIndex: `allocation-${index}`,
          key: `allocation-${index}`,
          align: "center",
        };
      }),
      align: "center",
    },
    {
      title:
        problemType === "banker"
          ? () => (
              <Select
                options={[
                  { value: "max", label: "Max" },
                  { value: "need", label: "Need" },
                ]}
                value={processInforType}
                onChange={(value) => dispatch(updateProcessInforType(value))}
              />
            )
          : "Request",
      dataIndex: processInforType,
      key: processInforType,
      children: [...Array(resourceNum)].map((_, index) => {
        return {
          title: `${String.fromCharCode(index + "A".charCodeAt(0))}`,
          dataIndex: `processInfor-${index}`,
          key: `processInfor-${index}`,
          align: "center",
        };
      }),
      align: "center",
    },
  ];

  return (
    <Table
      title={() => <SelectResourceNum />}
      footer={() => <AddProcessButton setProcesses={setProcesses} />}
      columns={columns}
      dataSource={processes}
      pagination={false}
      bordered
      size="middle"
    />
  );
}

export default ProcessTableInput;
