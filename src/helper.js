export function getActiveTodos(todos) {
  return todos.filter((todo) => !todo.complete)
}

export function getCompletedTodos(todos) {
  return todos.filter((todo) => todo.complete)
}
