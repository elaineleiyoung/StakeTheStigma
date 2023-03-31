import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Login from './components/scripts/login';
import Dashboard from './components/scripts/dashboard';
import Survey from './components/scripts/survey';
import Register from './components/scripts/register';
import Search from './components/scripts/search'
import { OpenAI } from './openAI'
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
// `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`
import chakraTheme from '@chakra-ui/theme'

const { Button, Card, Heading, Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,ModalFooter, } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
    Card,
    Heading,
    Divider,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,ModalFooter,
  },
})

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
      </Routes>
    </Router>
  );
}

export default App;
