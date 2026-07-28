interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const UserInfo = ({ user }: { user: User }) => {
  return (
    <div className="UserInfo">
      <a href={`mailto:${user.email}`}>{user.name}</a>
    </div>
  );
};
