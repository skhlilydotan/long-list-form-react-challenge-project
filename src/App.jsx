import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import StatisticsPage from './pages/statistics/StatisticsPage';
import UsersPage from './pages/users/UsersPage';
import {ContextProvider} from './context/usersContext';
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme.js";

function App() {
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <ContextProvider>
            <Routes>
              <Route path="/" exact element={<StatisticsPage />} />
              <Route path="users" element={<UsersPage />} />
            </Routes>
          </ContextProvider>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
