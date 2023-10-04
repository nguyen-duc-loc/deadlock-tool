import { Table } from "antd";
import { useSelector } from "react-redux";

function AvailableTable() {
  const { available } = useSelector((store) => store.result);

  const data = [
    {
      key: "availableData",
    },
  ];

  for (let i = 0; i < available.length; i++) {
    data[0][`available-${i}`] = available[i];
  }

  const columns = [
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      children: [...Array(available.length)].map((_, index) => {
        return {
          title: `${String.fromCharCode(index + "A".charCodeAt(0))}`,
          dataIndex: `available-${index}`,
          key: `available-${index}`,
          align: "center",
        };
      }),
      align: "center",
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={false} />;
}

export default AvailableTable;
