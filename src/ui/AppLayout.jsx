import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Header from "../features/header/Header";

function AppLayout() {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[auto_1fr] py-3 gap-0 md:h-screen overflow-hidden">
      <NavBar />
      <div className="flex flex-col w-full h-full">
        <Header />
        <div className="bg-stone-50 w-full h-full overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
