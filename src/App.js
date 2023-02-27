import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Login from './components/scripts/login';
import Survey from './components/scripts/survey';
import Articles from "./api.js" //import your signUp page
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Login />} />
        <Route path="/survey" element = {<Survey />} />
        <Route path="/articles" element = {<Articles />}/>
      </Routes>
    </Router>
  );
}

export default App;
