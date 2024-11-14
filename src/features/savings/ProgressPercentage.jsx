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
        width={150} // Increase the size of the Progress circle
        strokeWidth={10} // Increase the thickness of the progress stroke
        style={{ fontSize: "24px" }} // Increase font size inside the circle
      />
    </Flex>
  );
}

export default ProgressPercentage;
