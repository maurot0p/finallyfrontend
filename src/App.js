import './App.css';
import SignIn from './components/Login';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Accounts from './components/Account';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/transactions" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
    </div>
  );
}

export default App;
