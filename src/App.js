import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Login from './components/scripts/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Login />} />
      </Routes>
    </Router>
  
  );
}

export default App;
