import { Progress } from "antd";
import { Flex } from "antd";

/* eslint-disable react/prop-types */
function ProgressPercentage({ saving }) {
  const amount = parseInt(saving.amount);
  const goal = parseInt(saving.goal);
  const percentage = ((amount * 100) / goal).toFixed(0);

  return (
    <Flex gap="small" wrap>
      <Progress
        type="dashboard"
        percent={percentage}
        width={150}
        strokeWidth={10}
        style={{ fontSize: "24px" }}
      />
    </Flex>
  );
}

export default ProgressPercentage;
