import { useState, useCallback, useMemo } from "react";
import { uuid } from "../utils";
import { Status } from "../constants";

type Task = {
  [uuid: string]: {
    name: string;
    status: Status;
  };
};

const useTasks = () => {
  const [tasks, updateTasks] = useState<Task>({});
  const [startIndex, updateStartIndex] = useState(0);
  const tasksList = useMemo(
    () =>
      Object.keys(tasks)
        .filter((item) => tasks[item])
        .map((item) => ({
          id: item,
          ...tasks[item]
        })),
    [tasks]
  );

  const onScrollTasksList = () => {
    const scrollTop = document.getElementById("targetElementId")?.scrollTop;
    updateStartIndex(Math.floor((scrollTop ?? 0) / 30));
  };

  const onAddTask = useCallback((e) => {
    e.preventDefault();
    const { target = {} } = e;
    const { task = {} } = target;
    const { value = "" } = task;
    const name = value.trim();
    if (name) {
      e.target.reset();
      updateTasks((prev) => ({
        ...prev,
        [uuid()]: {
          name,
          status: Status.Active
        }
      }));
    }
  }, []);

  const onRemoveTask = useCallback(
    (e) => {
      const { target = {} } = e;
      const { id = "" } = target;
      const itemId = id.split("_")[1];
      if (tasks[itemId]) {
        updateTasks((prev) => ({ ...prev, [itemId]: undefined }));
      }
    },
    [tasks]
  );

  const onUpdateTask = useCallback(
    (e) => {
      const { target = {} } = e;
      const { id = "" } = target;
      if (tasks[id] && tasks[id].status === Status.Active) {
        updateTasks((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            status: Status.Done
          }
        }));
      }
    },
    [tasks]
  );

  const onToggleTasksList = useCallback(() => {
    let updatedTasksList = { ...tasks };
    for (let i = 0; i < 5; i++) {
      const { id = "" } = tasksList[startIndex + i];
      if (id) {
        updatedTasksList = {
          ...updatedTasksList,
          [id]: {
            ...updatedTasksList[id],
            status:
              updatedTasksList[id].status === Status.Active
                ? Status.Done
                : Status.Active
          }
        };
      }
    }
    updateTasks(updatedTasksList);
  }, [startIndex, tasksList, tasks]);

  return {
    tasks: tasksList,
    onAddTask,
    onRemoveTask,
    onUpdateTask,
    onScrollTasksList,
    onToggleTasksList
  };
};

export default useTasks;
