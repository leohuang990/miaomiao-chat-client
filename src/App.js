import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Coverpage from './pages/Coverpage'
import Sign from './pages/Sign'
import Homepage from './pages/Homepage'
import Demo from './pages/Demo'





function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path='/' exact component={Coverpage}></Route>
          <Route path='/sign' component={Sign}></Route>
          <Route path='/homepage' component={Homepage}></Route>
          <Route path='/demo' component={Demo}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
