export default function getActiveTodos(todos) {
  return todos.filter((todo) => !todo.complete)
}
