import { useState, useEffect, useCallback } from "react";
import ChatList from "./ChatList";
import { useOpenThreads } from "./useOpenThreads";
import { useMyThreads } from "./useMyThreads";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlinePlus } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import Modal from "../../ui/Modal";
import NewSupportRequestForm from "./NewSupportRequestForm";
import { useThreadSearch } from "./useThreadsSearch";

/* eslint-disable react/prop-types */
function Tab({ currentUser }) {
  const [activeTab, setActiveTab] = useState("my");
  const [searchTerm, setSearchTerm] = useState("");

  const { openThreads, isLoading: isLoadingOpen, refetch } = useOpenThreads();
  const { myThreads, isLoading: isLoadingMyThreads } = useMyThreads();

  const { searchResults, isLoading: isLoadingSearch } =
    useThreadSearch(searchTerm);

  const isStaff = localStorage.getItem("isStaff") === "true";

  useEffect(() => {
    if (searchTerm && searchTerm.trim().length >= 2) {
      if (activeTab !== "search_results") {
        setActiveTab("search_results");
      }
    } else {
      if (activeTab === "search_results") {
        setActiveTab("my");
      }
    }
  }, [searchTerm, activeTab]);

  const handleTabChange = useCallback(
    (tab) => {
      setSearchTerm("");
      setActiveTab(tab);
      if (tab === "open" && isStaff) {
        refetch();
      }
    },
    [isStaff, refetch]
  );

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  let threadsToDisplay = [];
  let currentIsLoading = true;
  let displayKey = activeTab;

  if (activeTab === "my") {
    threadsToDisplay = myThreads;
    currentIsLoading = isLoadingMyThreads;
  } else if (activeTab === "open" && isStaff) {
    threadsToDisplay = openThreads;
    currentIsLoading = isLoadingOpen;
  } else if (activeTab === "search_results") {
    threadsToDisplay = searchResults;
    currentIsLoading = isLoadingSearch;
    displayKey = `search-${searchTerm}`;
  }

  const baseButtonClass =
    "inline-block px-5 py-3 text-sm font-medium text-center rounded-t-lg focus:outline-none transition-colors duration-200";
  const activeClassLight = "text-green-500 bg-white";
  const inactiveClassLight =
    "text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-b-2 border-transparent";
  const activeClassDark = "dark:text-green-500 dark:bg-gray-700";
  const inactiveClassDark =
    "dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700/50 dark:border-b-2 dark:border-transparent";

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 shadow-sm w-full">
      <div className="p-3 flex items-center space-x-2 flex-shrink-0  dark:border-gray-700">
        <div className="flex-grow relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <IoSearchOutline
              className="h-5 w-5 text-gray-400 dark:text-gray-500"
              aria-hidden="true"
            />
          </span>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-10 pr-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        {!isStaff && (
          <Modal>
            <Modal.OpenButton opens="new-request">
              <button
                title="New Support Request"
                className="flex-shrink-0 p-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
              >
                <AiOutlinePlus className="h-5 w-5" />
              </button>
            </Modal.OpenButton>
            <Modal.Window name="new-request">
              <NewSupportRequestForm />
            </Modal.Window>
          </Modal>
        )}
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px px-2" role="tablist">
          <li className="mr-1" role="presentation">
            <button
              className={`${baseButtonClass} ${
                activeTab === "my"
                  ? `${activeClassLight} ${activeClassDark}`
                  : `${inactiveClassLight} ${inactiveClassDark}`
              }`}
              type="button"
              role="tab"
              onClick={() => handleTabChange("my")}
            >
              My threads
            </button>
          </li>
          {isStaff && (
            <li className="mr-1" role="presentation">
              <button
                className={`${baseButtonClass} ${
                  activeTab === "open"
                    ? `${activeClassLight} ${activeClassDark}`
                    : `${inactiveClassLight} ${inactiveClassDark}`
                }`}
                type="button"
                role="tab"
                onClick={() => handleTabChange("open")}
              >
                Open threads
              </button>
            </li>
          )}
        </ul>
      </div>

      {activeTab === "search_results" && searchTerm.trim().length >= 2 && (
        <div className="p-3 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/30 border-b border-gray-200 dark:border-gray-700">
          Displaying search results for:{" "}
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            &quot;{searchTerm}&quot;
          </span>{" "}
          {currentIsLoading && <span className="ml-2">Loading...</span>}
        </div>
      )}

      <div className="flex-grow">
        <div className="flex-grow min-h-[calc(100%-theme('spacing.12'))] overflow-y-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 p-1"
            >
              <ChatList
                threads={threadsToDisplay}
                isLoading={currentIsLoading}
                className="h-full"
                currentUser={currentUser}
                emptyStateMessage={
                  activeTab === "search_results" &&
                  !currentIsLoading &&
                  searchTerm.trim().length >= 2 &&
                  (!threadsToDisplay || threadsToDisplay.length === 0)
                    ? `No threads found for "${searchTerm}".`
                    : undefined
                }
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Tab;
