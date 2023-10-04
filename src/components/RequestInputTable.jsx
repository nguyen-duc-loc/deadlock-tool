import { Form, InputNumber, Select, Space, Switch, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateRequest, updateRequestProcess } from "../problemSlice";

function RequestInputTable() {
  const { resourceNum, requestProcess, processNum, request } = useSelector(
    (store) => store.problem
  );
  const dispatch = useDispatch();

  const requestInformation = [
    {
      key: "request",
      process: (
        <Select
          value={requestProcess}
          options={[...Array(processNum)].map((_, index) => {
            return { value: index, label: `Process ${index}` };
          })}
          disabled={!request}
          onChange={(value) => dispatch(updateRequestProcess(value))}
        />
      ),
    },
  ];
  for (let i = 0; i < resourceNum; i++) {
    requestInformation[0][`resource-${i}`] = (
      <Form.Item
        noStyle
        name={["request", `resource-${i}`]}
        rules={[
          {
            required: request,
          },
        ]}
      >
        <InputNumber name={`resource-${i}`} min={0} disabled={!request} />
      </Form.Item>
    );
  }

  const columns = [
    {
      title: "Process",
      dataIndex: "process",
      key: "process",
      align: "center",
      rowSpan: 2,
    },
    {
      title: "Resource request",
      dataIndex: "resource-request",
      key: "resource-request",
      children: [...Array(resourceNum)].map((_, index) => {
        return {
          title: `${String.fromCharCode(index + "A".charCodeAt(0))}`,
          dataIndex: `resource-${index}`,
          key: `resource-${index}`,
          align: "center",
          width: 120,
        };
      }),
      align: "center",
    },
  ];

  return (
    <Table
      title={() => (
        <Space>
          <Switch onChange={(checked) => dispatch(updateRequest(checked))} />
          Check request
        </Space>
      )}
      columns={columns}
      dataSource={requestInformation}
      pagination={false}
    />
  );
}

export default RequestInputTable;
