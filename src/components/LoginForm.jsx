import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginRequest } from '../services/usersAPI';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const passwordMinLength = 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginRequest({ email, password });
      localStorage.setItem('token', data.token);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch ({ response }) {
      console.log(response.data.message);
    }
  };
  return (
    <div
      className='flex
    flex-col
    items-center
    justify-center
    space-y-4
    '>
      <form
        className='flex flex-col items-center  justify-center space-y-4'
        onSubmit={handleSubmit}>
        <input
          type='email'
          className='input input-bordered bg-gray-50'
          placeholder='Email'
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <input
          type='password'
          className='input input-bordered bg-gray-50 w-full'
          placeholder='Password'
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <button
          type='submit'
          className='
          btn
          btn-neutral
          btn-accent
          text-lg
          text-white
          w-full
          '>
          Log In
        </button>
        <div className='divider w-full'></div>
        <Link
          to={'/register'}
          className='flex items-center w-full justify-center'>
          <button
            type='button'
            className='
          btn
          btn-neutral
          btn-accent
          text-white
          text-s
          w-3/4
          '>
            Create new account
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
