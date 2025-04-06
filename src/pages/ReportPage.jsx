import { Outlet } from "react-router-dom";

function ReportPage() {
  return (
    <div className="h-full overflow-y-scroll dark:bg-gray-800">
      <Outlet />
    </div>
  );
}

export default ReportPage;
