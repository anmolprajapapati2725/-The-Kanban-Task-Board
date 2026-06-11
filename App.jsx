import { useMemo, useState } from "react";
import { BoardHeader } from "./components/BoardHeader.jsx";
import { KanbanColumn } from "./components/KanbanColumn.jsx";
import { COLUMNS, DEFAULT_PRIORITY, createTask } from "./constants/kanban.js";
import { usePersistentBoard } from "./hooks/usePersistentBoard.js";

function App() {
  const [board, setBoard] = usePersistentBoard();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState(DEFAULT_PRIORITY);

  const boardStats = useMemo(() => {
    const totalTasks = COLUMNS.reduce(
      (total, column) => total + board[column.id].length,
      0
    );

    return {
      totalTasks,
      activeTasks: board.todo.length + board.inProgress.length,
      completedTasks: board.done.length,
    };
  }, [board]);

  function handleAddTask(event) {
    event.preventDefault();

    const trimmedTitle = taskTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    setBoard((currentBoard) => ({
      ...currentBoard,
      todo: [createTask(trimmedTitle, taskPriority), ...currentBoard.todo],
    }));

    setTaskTitle("");
    setTaskPriority(DEFAULT_PRIORITY);
  }

  function handleDeleteTask(columnId, taskId) {
    setBoard((currentBoard) => ({
      ...currentBoard,
      [columnId]: currentBoard[columnId].filter((task) => task.id !== taskId),
    }));
  }

  function handleMoveTask(sourceColumnId, taskId, targetColumnId) {
    if (!targetColumnId || sourceColumnId === targetColumnId) {
      return;
    }

    setBoard((currentBoard) => {
      const taskToMove = currentBoard[sourceColumnId].find(
        (task) => task.id === taskId
      );

      if (!taskToMove) {
        return currentBoard;
      }

      return {
        ...currentBoard,
        [sourceColumnId]: currentBoard[sourceColumnId].filter(
          (task) => task.id !== taskId
        ),
        [targetColumnId]: [taskToMove, ...currentBoard[targetColumnId]],
      };
    });
  }

  function handleUpdateTask(columnId, taskId, nextTitle) {
    const trimmedTitle = nextTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    setBoard((currentBoard) => ({
      ...currentBoard,
      [columnId]: currentBoard[columnId].map((task) =>
        task.id === taskId ? { ...task, title: trimmedTitle } : task
      ),
    }));
  }

  return (
    <main className="app-shell">
      <BoardHeader
        stats={boardStats}
        taskTitle={taskTitle}
        taskPriority={taskPriority}
        onTitleChange={setTaskTitle}
        onPriorityChange={setTaskPriority}
        onSubmit={handleAddTask}
      />

      <section className="board" aria-label="Kanban board">
        {COLUMNS.map((column, index) => (
          <KanbanColumn
            key={column.id}
            column={column}
            columnIndex={index}
            tasks={board[column.id]}
            onDeleteTask={handleDeleteTask}
            onMoveTask={handleMoveTask}
            onUpdateTask={handleUpdateTask}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
