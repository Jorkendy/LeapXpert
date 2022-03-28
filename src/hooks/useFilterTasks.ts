import { Task } from "../types";
import { useState, useCallback } from "react";

const useFilterTasks = (tasks: Task[]) => {
  const [activeTab, setActiveTab] = useState(2);

  const onFilterTasks = useCallback(
    (e) => {
      const { target = {} } = e;
      const { id = 1 } = target;
      if (id !== activeTab) {
        setActiveTab(+id);
      }
    },
    [activeTab]
  );

  if (activeTab === 2) {
    return { tasks, onFilterTasks, activeTab };
  }

  return {
    tasks: tasks.filter((item) => item.status === activeTab),
    onFilterTasks,
    activeTab
  };
};

export default useFilterTasks;
