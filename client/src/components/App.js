import React from 'react';
import {Route, Switch} from 'react-router-dom';
import About from './about';
import RegisterLogin from './RegisterLogin';
import Register from './RegisterLogin/register';
function App() {
  return (
    <div>
      <Switch>
        <Route path="/api/user/logout" component={About}/>
        <Route path="/register" component={Register}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={RegisterLogin}/>
      </Switch>
    </div>
  );
}

export default App;
