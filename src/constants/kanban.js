export const STORAGE_KEY = "prodesk-sprint-5-kanban";
export const DEFAULT_PRIORITY = "medium";

export const PRIORITIES = {
  high: {
    label: "High",
    className: "priority-high",
  },
  medium: {
    label: "Medium",
    className: "priority-medium",
  },
  low: {
    label: "Low",
    className: "priority-low",
  },
};

export const COLUMNS = [
  {
    id: "todo",
    title: "To Do",
    emptyText: "No open work yet.",
  },
  {
    id: "inProgress",
    title: "In Progress",
    emptyText: "Move a task here when work starts.",
  },
  {
    id: "done",
    title: "Done",
    emptyText: "Completed work will appear here.",
  },
];

function createTaskId() {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
}

export function createTask(title, priority = DEFAULT_PRIORITY) {
  return {
    id: createTaskId(),
    title,
    priority,
    createdAt: new Date().toISOString(),
  };
}

export function createDefaultBoard() {
  return {
    todo: [createTask("Draft Sprint 5 board layout", "medium")],
    inProgress: [createTask("Wire React state to task cards", "high")],
    done: [createTask("Initialize Vite project", "low")],
  };
}
