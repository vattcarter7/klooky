import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { HomePage, SignInPage, SignUpPage } from './pages';

import { Header, LoginSuccess } from './components';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signin' component={SignInPage} />
        <Route exact path='/signup' component={SignUpPage} />
        <Route exact path='/login/success' component={LoginSuccess} />
      </Switch>
    </div>
  );
}

export default App;
