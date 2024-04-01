import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Header from "../features/header/Header";

function AppLayout() {
  return (
    <div className="grid grid-cols-[auto_1fr] py-3 gap-0">
      <NavBar />
      <div className="flex flex-col">
        <Header />
        <div className="bg-stone-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
