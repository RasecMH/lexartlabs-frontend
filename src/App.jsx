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
        await validateRequest();
        navigate('/dashboard');
      } catch (error) {
        navigate('/login');
      }
    };

    auth();
  }, []);

  return <></>;
}

export default App;
