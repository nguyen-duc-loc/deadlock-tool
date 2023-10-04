import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateProblemType } from "../problemSlice";
import { hideResult } from "../resultSlice";

function SelectProblem() {
  const { problemType } = useSelector((store) => store.problem);
  const dispatch = useDispatch();

  function handleChange(value) {
    dispatch(updateProblemType(value));
    dispatch(hideResult());
  }

  return (
    <Select
      options={[
        { value: "banker", label: "Banker algorithm" },
        { value: "detection", label: "Deadlock detection" },
      ]}
      value={problemType}
      style={{ width: 170 }}
      onChange={handleChange}
    />
  );
}

export default SelectProblem;
