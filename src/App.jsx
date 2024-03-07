import { useEffect } from 'react';
import './App.css';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { validateRequest } from './services/usersAPI';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = async () => {
      try {
        const token = localStorage.getItem('token');
        await validateRequest(token);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } catch (error) {
        navigate('/login');
      }
    };

    auth();
    return () => {};
  }, []);

  return <></>;
}

export default App;
