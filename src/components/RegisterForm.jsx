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
  const [errorMessage, setErrorMessage] = useState('');

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
      if (response.data.message === 'user not available') {
        setErrorMessage('Email is not available');
      }
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
      {errorMessage && (
        <div role='alert' className='alert alert-error'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 shrink-0 stroke-current'
            fill='none'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>Error! {errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
