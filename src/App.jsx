import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import StatisticsPage from './pages/statistics/StatisticsPage';
import UsersPage from './pages/users/UsersPage';
import { setUsers } from '@slices/usersSlice';
import data from '@/data/initialUsersData.json';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUsers(data));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' exact element={<StatisticsPage />} />
        <Route path='users' element={<UsersPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
