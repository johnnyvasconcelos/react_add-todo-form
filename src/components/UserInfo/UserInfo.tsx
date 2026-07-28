import { User } from '../../App';

export const UserInfo = ({ user }: { user: User }) => {
  return (
    <div className="UserInfo">
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </div>
  );
};
