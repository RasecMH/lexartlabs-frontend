import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div className='navbar bg-base-100 fixed top-0'>
      <div className='flex-1'>
        <Link to={'/dashboard'} className='btn btn-ghost text-xl'>
          Home
        </Link>
      </div>
      <div className='flex-none'>
        <button onClick={handleLogout} className='btn btn-square btn-ghost'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
