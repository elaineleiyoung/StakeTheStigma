import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Login from './components/scripts/login';
import Dashboard from './components/scripts/dashboard'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Login />} />
        <Route path="/dashboard" element = {<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
