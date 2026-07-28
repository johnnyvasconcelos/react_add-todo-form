interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
}
export const UserInfo = ({ todo }: { todo: Todo }) => {
  return (
    <a className="UserInfo" href="mailto:Sincere@april.biz">
      {todo.user?.name}
    </a>
  );
};
