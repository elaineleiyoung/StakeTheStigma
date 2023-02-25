import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Login from './components/scripts/login';
import Survey from './components/scripts/survey';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Login />} />
        <Route path="/survey" element = {<Survey />} />
      </Routes>
    </Router>
  );
}

export default App;
