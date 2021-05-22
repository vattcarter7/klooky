import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { HomePage, SignInPage, SignUpPage } from './pages';

import { Header } from './components';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signin' component={SignInPage} />
        <Route exact path='/signup' component={SignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
