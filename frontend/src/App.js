import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import { Button } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <Button colorScheme='blue'>
        hello
      </Button>
      {/* the exact feature makes sure that the router
      goes to that exact path */}
      <Route path='/' component={ HomePage } exact />
      <Route path='/chats' component={ ChatPage } />
    </div>
  );
}

export default App;
