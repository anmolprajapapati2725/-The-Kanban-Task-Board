import { PRIORITIES } from "../constants/kanban.js";

export function TaskForm({
  taskTitle,
  taskPriority,
  onTitleChange,
  onPriorityChange,
  onSubmit,
}) {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <label className="field task-title-field">
        <span>Task</span>
        <input
          type="text"
          value={taskTitle}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Add a new task"
          maxLength={90}
        />
      </label>

      <label className="field priority-field">
        <span>Priority</span>
        <select
          value={taskPriority}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          {Object.entries(PRIORITIES).map(([priorityKey, priority]) => (
            <option key={priorityKey} value={priorityKey}>
              {priority.label}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" className="primary-action">
        Add Task
      </button>
    </form>
  );
}
