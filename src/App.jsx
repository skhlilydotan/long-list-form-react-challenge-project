import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import StatisticsPage from './pages/statistics/StatisticsPage';
import UsersPage from './pages/users/UsersPage';
import { UsersContextProvider } from './context/usersContext';
import { UserFormContextProvider } from './context/userFormContext';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <UsersContextProvider>
        <Routes>
          <Route path="/" exact element={<StatisticsPage />} />
          <Route
            path="users"
            element={
              <UserFormContextProvider>
                <UsersPage />
              </UserFormContextProvider>
            }
          />
        </Routes>
      </UsersContextProvider>
    </BrowserRouter>
  );
}

export default App;
