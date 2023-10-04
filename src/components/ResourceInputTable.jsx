/* eslint-disable react/prop-types */
import { Form, InputNumber, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateResourceInforType } from "../problemSlice";

function ResourceInputTable() {
  const { resourceInforType, resourceNum } = useSelector(
    (store) => store.problem
  );
  const dispatch = useDispatch();

  const columns = [...Array(resourceNum)].map((_, index) => {
    return {
      title: `${String.fromCharCode(index + "A".charCodeAt(0))}`,
      dataIndex: `resource-${index}`,
      key: `resource-${index}`,
      align: "center",
      width: 120,
    };
  });

  const resourcesInformation = [
    {
      key: "resource",
    },
  ];
  for (let i = 0; i < resourceNum; i++) {
    resourcesInformation[0][`resource-${i}`] = (
      <Form.Item
        noStyle
        name={[`${resourceInforType}`, `resource-${i}`]}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber name={`resource-${i}`} min={0} />
      </Form.Item>
    );
  }

  return (
    <Table
      title={() => (
        <Select
          style={{ width: 160 }}
          options={[
            { value: "total", label: "Total resources" },
            { value: "available", label: "Available resources" },
          ]}
          value={resourceInforType}
          onChange={(value) => dispatch(updateResourceInforType(value))}
        />
      )}
      columns={columns}
      dataSource={resourcesInformation}
      pagination={false}
      bordered
      size="small"
    />
  );
}

export default ResourceInputTable;
