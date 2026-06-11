import { useEffect, useState } from "react";
import { COLUMNS, PRIORITIES } from "../constants/kanban.js";

export function TaskCard({
  task,
  columnId,
  columnIndex,
  onDeleteTask,
  onMoveTask,
  onUpdateTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const priority = PRIORITIES[task.priority] ?? PRIORITIES.medium;
  const previousColumn = COLUMNS[columnIndex - 1];
  const nextColumn = COLUMNS[columnIndex + 1];

  useEffect(() => {
    setDraftTitle(task.title);
  }, [task.title]);

  function saveTitle() {
    const nextTitle = draftTitle.trim();

    if (nextTitle) {
      onUpdateTask(columnId, task.id, nextTitle);
    }

    setDraftTitle(nextTitle || task.title);
    setIsEditing(false);
  }

  function cancelEdit() {
    setDraftTitle(task.title);
    setIsEditing(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      saveTitle();
    }

    if (event.key === "Escape") {
      cancelEdit();
    }
  }

  return (
    <article className={`task-card ${priority.className}`}>
      <div className="task-content">
        <span className="priority-pill">{priority.label}</span>

        {isEditing ? (
          <input
            className="edit-input"
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            onBlur={saveTitle}
            onKeyDown={handleKeyDown}
            aria-label={`Edit ${task.title}`}
            autoFocus
          />
        ) : (
          <button
            type="button"
            className="task-title"
            onClick={() => setIsEditing(true)}
          >
            {task.title}
          </button>
        )}
      </div>

      <div className="task-actions" aria-label={`Actions for ${task.title}`}>
        <button
          type="button"
          onClick={() => onMoveTask(columnId, task.id, previousColumn?.id)}
          disabled={!previousColumn}
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => onMoveTask(columnId, task.id, nextColumn?.id)}
          disabled={!nextColumn}
        >
          Next
        </button>
        <button
          type="button"
          className="danger-action"
          onClick={() => onDeleteTask(columnId, task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
