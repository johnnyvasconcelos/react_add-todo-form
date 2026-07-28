import { TodoInfo } from '../TodoInfo';
import { LocalTodo } from '../../App';

export const TodoList = ({ todos }: { todos: LocalTodo[] }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
