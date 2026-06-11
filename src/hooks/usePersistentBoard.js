import { useEffect, useState } from "react";
import {
  COLUMNS,
  PRIORITIES,
  STORAGE_KEY,
  createDefaultBoard,
} from "../constants/kanban.js";

function isValidTask(task) {
  return (
    task &&
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    Object.hasOwn(PRIORITIES, task.priority)
  );
}

function normalizeBoard(candidateBoard) {
  const hasExpectedColumns = COLUMNS.every((column) =>
    Array.isArray(candidateBoard?.[column.id])
  );

  if (!hasExpectedColumns) {
    return createDefaultBoard();
  }

  return COLUMNS.reduce((board, column) => {
    board[column.id] = candidateBoard[column.id].filter(isValidTask);
    return board;
  }, {});
}

function loadSavedBoard() {
  try {
    const savedBoard = localStorage.getItem(STORAGE_KEY);
    return savedBoard
      ? normalizeBoard(JSON.parse(savedBoard))
      : createDefaultBoard();
  } catch {
    return createDefaultBoard();
  }
}

export function usePersistentBoard() {
  const [board, setBoard] = useState(loadSavedBoard);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
    } catch {
      // The board still works in memory if storage is unavailable.
    }
  }, [board]);

  return [board, setBoard];
}
