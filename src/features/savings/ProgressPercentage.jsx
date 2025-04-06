import { Progress } from "antd";
import { Flex } from "antd";

/* eslint-disable react/prop-types */
function ProgressPercentage({ currentSaving }) {
  const amount = parseInt(currentSaving.amount);
  const goal = parseInt(currentSaving.goal);
  const percentage = ((amount * 100) / goal).toFixed(0);

  return (
    <Flex gap="small" wrap>
      <Progress
        type="dashboard"
        percent={percentage}
        width={150}
        strokeWidth={10}
        style={{ fontSize: "24px" }}
        format={(percent) => (
          <span className="dark:text-lightBg">{percent}%</span>
        )}
      />
    </Flex>
  );
}

export default ProgressPercentage;
