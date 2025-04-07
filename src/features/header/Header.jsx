import UserMenu from "./UserMenu";

function Header() {
  return (
    <header
      className="sticky top-0 z-10 bg-white dark:bg-gray-800 
                 border-b border-gray-200 dark:border-stone-700
                 shadow-md px-6 py-3"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div></div>

        <UserMenu />
      </div>
    </header>
  );
}

export default Header;
