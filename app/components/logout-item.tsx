import { logout } from '../actions';

const LogoutItem = () => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <form action={handleLogout}>
      <button className="flex w-full text-2xl cursor-pointer">Logout</button>
    </form>
  );
};

export default LogoutItem;
