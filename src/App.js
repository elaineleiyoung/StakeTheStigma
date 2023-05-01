import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Login from './components/scripts/login';
import Dashboard from './components/scripts/dashboard';
import Survey from './components/scripts/survey';
import Register from './components/scripts/register';
import Search from './components/scripts/search';
import FormComponent from './FormContributor.js';
import Insights from "./components/scripts/insights";
import Profile from "./components/Profile";
import { OpenAI } from './openAI'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Login />} />
        <Route path="/dashboard" element = {<Dashboard />}/>
        <Route path="/survey" element = {<Survey />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/summarization" element = {<OpenAI />} />
        <Route path="/search" element = {<Search />} />
        <Route path="/contributor" element = {<FormComponent />} />
        <Route path="/insights" element = {<Insights />} />
        <Route path="/profile" element = {<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
