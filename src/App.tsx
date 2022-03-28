import "./styles.scss";
import { Status } from "./constants";
import useTasks from "./hooks/useTasks";
import useFilterTasks from "./hooks/useFilterTasks";

export default function App() {
  const {
    tasks: tasksList,
    onAddTask,
    onRemoveTask,
    onUpdateTask,
    onScrollTasksList,
    onToggleTasksList
  } = useTasks();
  const { tasks, onFilterTasks, activeTab } = useFilterTasks(tasksList);

  return (
    <div className="App">
      <form onSubmit={onAddTask}>
        <input name="task" placeholder="Enter todo name here" />
      </form>
      {tasks.length > 0 && (
        <>
          <div className="header">
            <button
              id="2"
              className={activeTab === 2 ? "active" : ""}
              type="button"
              onClick={onFilterTasks}
            >
              All
            </button>
            <button
              id="0"
              className={activeTab === 0 ? "active" : ""}
              type="button"
              onClick={onFilterTasks}
            >
              Active
            </button>
            <button
              id="1"
              className={activeTab === 1 ? "active" : ""}
              type="button"
              onClick={onFilterTasks}
            >
              Done
            </button>
          </div>

          <ul
            id="targetElementId"
            className="tasksList"
            onScroll={onScrollTasksList}
          >
            {tasks.map((item) => (
              <li className="taskItem" key={item.id}>
                <p
                  id={item.id}
                  onClick={onUpdateTask}
                  className={item.status === Status.Active ? "" : "done"}
                >
                  {item.name}
                </p>

                <button
                  id={`delete_${item.id}`}
                  className="deleteButton"
                  type="button"
                  onClick={onRemoveTask}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <button type="button" onClick={onToggleTasksList}>
            Toggle All
          </button>
        </>
      )}
    </div>
  );
}
