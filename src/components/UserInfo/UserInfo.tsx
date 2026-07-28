import { TodoInterface } from '../../App';
export const UserInfo = ({ todo }: { todo: TodoInterface }) => {
  if (!todo.user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${todo.user?.email}`}>
      {todo.user?.name}
    </a>
  );
};
