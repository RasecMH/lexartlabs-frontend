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
      console.log(data.token);
      localStorage.setItem('token', data.token);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
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
      {/* <img src={}} className='w-36 self-center' /> */}
      <form
        className='flex flex-col align-center justify-center space-y-4'
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
          className='input input-bordered bg-gray-50'
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
          text-white
          '>
          Login
        </button>
        <Link to={'/register'}>
          <button
            type='button'
            className='
          btn
          btn-neutral
          btn-accent
          text-white
          w-full
          '>
            Register
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
