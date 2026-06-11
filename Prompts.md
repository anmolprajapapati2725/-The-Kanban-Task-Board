# Prompts Workflow

## Sprint 5 Goal

Build a Trello-style Kanban task board using Vite and React. The board must demonstrate component architecture, `useState`, props, state updates from child components, and refresh-safe persistence.

## Implementation Prompts Used

1. Create a Vite React application for a three-column Kanban board with To Do, In Progress, and Done columns.
2. Implement task creation with a priority dropdown and add new tasks to the To Do column.
3. Add universal delete and move actions for every task card.
4. Add inline editing so a task title can switch between display mode and input mode.
5. Persist the complete board state to browser `localStorage` and restore it on reload.

## QA Notes

- State is stored as an object keyed by column id.
- Child components receive data and callback functions through props.
- Empty task titles are rejected during creation and ignored during editing.
- `localStorage` parsing has a fallback so corrupted data does not break the app.
- The code is organized into reusable components, shared constants, and a custom persistence hook.
