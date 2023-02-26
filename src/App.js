import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Login from './components/scripts/Login';
import Register from "./components/scripts/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Login />} />
        <Route path="/register" element = {<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
