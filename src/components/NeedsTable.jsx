import { Table } from "antd";
import { useSelector } from "react-redux";

function NeedsTable() {
  const { resourceNum } = useSelector((store) => store.problem);
  const { needs } = useSelector((store) => store.result);

  const data = needs.map((need) => {
    return {
      key: need.processName,
      process: need.processName,
    };
  });

  for (let i = 0; i < needs.length; i++) {
    for (let j = 0; j < needs[i].need.length; j++) {
      data[i][`need-${j}`] = needs[i].need[j];
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
      title: "Need",
      key: "needs",
      dataIndex: "needs",
      children: [...Array(resourceNum)].map((_, index) => {
        return {
          title: `${String.fromCharCode(index + "A".charCodeAt(0))}`,
          dataIndex: `need-${index}`,
          key: `need-${index}`,
          align: "center",
        };
      }),
      align: "center",
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={false} />;
}

export default NeedsTable;
