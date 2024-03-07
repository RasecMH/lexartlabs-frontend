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
  // const passwordMinLength = 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerRequest({ name, email, password });
      console.log(data.token);
      localStorage.setItem('token', data.token);

      navigate('/dashboard');
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
          '
          // disabled={
          //   !(
          //     email.match(/\S+@\S+\.\S+/i) &&
          //     password.length > passwordMinLength
          //   )
          // }
        >
          Register
        </button>
        <Link to={'/login'}>
          <button
            type='submit'
            className='
          btn
          btn-neutral
          btn-accent
          text-white
          w-full
          '>
            Login
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
