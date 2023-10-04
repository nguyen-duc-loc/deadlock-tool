/* eslint-disable react/prop-types */
import { InputNumber, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateResourceNum } from "../problemSlice";

function SelectResourceNum() {
  const dispatch = useDispatch();
  const { resourceNum } = useSelector((store) => store.problem);

  return (
    <Space>
      <span>Number of resources:</span>
      <InputNumber
        min={1}
        max={4}
        value={resourceNum}
        onChange={(value) => dispatch(updateResourceNum(value))}
      />
    </Space>
  );
}

export default SelectResourceNum;
