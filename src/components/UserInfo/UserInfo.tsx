import { TodoInterface } from '../../App';
export const UserInfo = ({ todo }: { todo: TodoInterface }) => {
  const user = todo.user;

  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${todo.user?.email}`}>
      {todo.user?.name}
    </a>
  );
};
