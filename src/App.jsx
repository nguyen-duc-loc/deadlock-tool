import { Space } from "antd";
import SelectProblem from "./components/SelectProblem";
import TableForm from "./components/TableForm";
import Result from "./components/Result";
import { useSelector } from "react-redux";

function App() {
  const { show } = useSelector((store) => store.result);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "80px",
        marginBottom: "30px",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "80vw" }}>
        <SelectProblem />
        <TableForm />
        {show && <Result />}
      </Space>
    </div>
  );
}

export default App;
