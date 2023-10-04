import { Col, Row, Tag, Typography } from "antd";
import { useSelector } from "react-redux";
import AvailableTable from "./AvailableTable";
import NeedsTable from "./NeedsTable";
import RequestTable from "./RequestTable";

const { Paragraph, Text } = Typography;

function Result() {
  const { problemType } = useSelector((store) => store.problem);
  const { status, safeSequence, activities, errorMessage } = useSelector(
    (store) => store.result
  );
  const success = status === "safe" || status === "no deadlock";

  return (
    <Row justify="space-around">
      <Col>{problemType === "banker" ? <NeedsTable /> : <RequestTable />}</Col>
      <Col>
        <AvailableTable />
      </Col>
      <Col>
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            State:{" "}
            {
              <Tag
                color={success ? "success" : "error"}
                style={{ fontSize: 14 }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Tag>
            }
            . {success && `Safe sequence is: ${safeSequence.join(" --- ")}`}
            {errorMessage && `${errorMessage}.`}
          </Text>
        </Paragraph>
        {status !== "error" &&
          activities.length !== 0 &&
          activities.map((act) => (
            <Paragraph key={act.selectedProcess}>
              {act.selectedProcess} is selected. Available resouce: [
              {act.available.map((r, i) => (
                <Text key={`resource-${i}`} style={{ padding: 4 }}>
                  {r}
                </Text>
              ))}
              ]. Finish: [
              {act.finish.map((finish, i) => (
                <Text
                  key={`finish-${i}`}
                  type={finish ? "success" : "danger"}
                  style={{ padding: 4 }}
                >
                  {finish ? "True" : "False"}
                </Text>
              ))}
              ]
            </Paragraph>
          ))}
      </Col>
    </Row>
  );
}

export default Result;
