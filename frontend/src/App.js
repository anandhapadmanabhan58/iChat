import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { ChatState } from './context/ChatProvider';

import './App.css';
import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';
import { Route, Switch } from 'react-router-dom';
function App() {
  const { setUser } = ChatState();

  const history = useHistory();
  useContext(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser(userInfo);
      history.push('/chats');
    }
  }, [history]);

  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Homepage} exact></Route>
        <Route path="/chats" component={Chatpage}></Route>
      </Switch>
    </div>
  );
}

export default App;
