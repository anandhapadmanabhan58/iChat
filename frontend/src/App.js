import './App.css';
import Homepage from './pages/Homepage';
import Chatpage from './pages/Chatpage';
import { Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Homepage} exact></Route>
        <Route path="/chat" component={Chatpage}></Route>
      </Switch>
    </div>
  );
}

export default App;
