import { Table } from "antd";
import { useSelector } from "react-redux";

function RequestTable() {
  const { resourceNum } = useSelector((store) => store.problem);
  const { requests } = useSelector((store) => store.result);

  const data = requests.map((request) => {
    return {
      key: request.processName,
      process: request.processName,
    };
  });

  for (let i = 0; i < requests.length; i++) {
    for (let j = 0; j < requests[i].request.length; j++) {
      data[i][`request-${j}`] = requests[i].request[j];
    }
  }

  const columns = [
    {
      title: "Process",
      key: "process",
      dataIndex: "process",
      align: "center",
    },
    {
      title: "Request",
      key: "requests",
      dataIndex: "requests",
      children: [...Array(resourceNum)].map((_, index) => {
        return {
          title: `${String.fromCharCode(index + "A".charCodeAt(0))}`,
          dataIndex: `request-${index}`,
          key: `request-${index}`,
          align: "center",
        };
      }),
      align: "center",
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={false} />;
}

export default RequestTable;
