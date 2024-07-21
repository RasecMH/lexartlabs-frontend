import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerRequest } from '../services/usersAPI';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerRequest({ name, email, password });
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
    align-center
    justify-center
    space-y-4
    '>
      <form
        className='flex flex-col align-center justify-center space-y-4'
        onSubmit={handleSubmit}>
        <input
          type='text'
          className='input input-bordered bg-gray-50'
          placeholder='Name'
          value={name}
          onChange={({ target: { value } }) => setName(value)}
        />
        <input
          type='email'
          className='input input-bordered bg-gray-50'
          placeholder='Email'
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <input
          type='password'
          className='input input-bordered bg-gray-50'
          placeholder='Password'
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <input
          type='password'
          className='input input-bordered bg-gray-50'
          placeholder='Password Again'
          value={passwordAgain}
          onChange={({ target: { value } }) => setPasswordAgain(value)}
        />
        <button
          type='submit'
          className='
          btn
          btn-neutral
          btn-accent
          text-white
          '>
          Sign Up
        </button>
        <div className='divider w-full'></div>
        <Link to={'/login'} className='flex items-center w-full justify-center'>
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
            Log In
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
