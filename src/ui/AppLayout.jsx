import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Header from "../features/header/Header";
import MobileNav from "./MobileNav";

function AppLayout() {
  return (
    <div className="min-h-screen w-full dark:bg-gray-800 dark:text-white">
      <div className="block lg:hidden">
        <MobileNav />
        <div className="bg-stone-50 w-full min-h-screen px-4 pt-4 pb-8 dark:bg-gray-800">
          <Outlet />
        </div>
      </div>

      <div className="hidden lg:grid lg:grid-cols-[auto_1fr] lg:h-screen">
        <div>
          <NavBar />
        </div>
        <div className="flex flex-col w-full overflow-hidden">
          <Header />
          <div className="bg-stone-50 w-full grow dark:bg-gray-800 flex flex-col overflow-hidden">
            <main className="mx-auto h-full w-full">
              {" "}
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
