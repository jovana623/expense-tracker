import { createContext, useState } from "react";

const ThreadContext = createContext();

/* eslint-disable react/prop-types */
export function ThreadProvider({ children }) {
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  return (
    <ThreadContext.Provider value={{ selectedThreadId, setSelectedThreadId }}>
      {children}
    </ThreadContext.Provider>
  );
}

export default ThreadContext;
