import { TaskCard } from "./TaskCard.jsx";

export function KanbanColumn({
  column,
  columnIndex,
  tasks,
  onDeleteTask,
  onMoveTask,
  onUpdateTask,
}) {
  const taskCountLabel = `${tasks.length} ${
    tasks.length === 1 ? "task" : "tasks"
  }`;

  return (
    <article className="column" aria-labelledby={`${column.id}-title`}>
      <header className="column-header">
        <div>
          <h2 id={`${column.id}-title`}>{column.title}</h2>
          <p>{taskCountLabel}</p>
        </div>
        <span aria-hidden="true">{tasks.length}</span>
      </header>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty-state">{column.emptyText}</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columnId={column.id}
              columnIndex={columnIndex}
              onDeleteTask={onDeleteTask}
              onMoveTask={onMoveTask}
              onUpdateTask={onUpdateTask}
            />
          ))
        )}
      </div>
    </article>
  );
}
