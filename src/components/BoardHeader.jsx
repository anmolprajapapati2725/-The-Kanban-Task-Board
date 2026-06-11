import { TaskForm } from "./TaskForm.jsx";

export function BoardHeader({
  stats,
  taskTitle,
  taskPriority,
  onTitleChange,
  onPriorityChange,
  onSubmit,
}) {
  return (
    <section className="page-header" aria-labelledby="board-title">
      <div className="header-copy">
        <p className="eyebrow">Sprint 5 React Module</p>
        <h1 id="board-title">Kanban Task Board</h1>
        <p className="summary">
          A focused workspace for planning, active execution, and completion.
        </p>
      </div>

      <div className="header-panel">
        <div className="metrics" aria-label="Board summary">
          <Metric label="Total Tasks" value={stats.totalTasks} />
          <Metric label="Active" value={stats.activeTasks} />
          <Metric label="Completed" value={stats.completedTasks} />
        </div>

        <TaskForm
          taskTitle={taskTitle}
          taskPriority={taskPriority}
          onTitleChange={onTitleChange}
          onPriorityChange={onPriorityChange}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
