import { Outlet } from "react-router-dom";

function ReportPage() {
  return (
    <div className="h-full overflow-y-scroll">
      <Outlet />
    </div>
  );
}

export default ReportPage;
