import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home/home-page';
import SignInPage from './pages/sign-in/sign-in-page';

import { Header } from './components';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signin' component={SignInPage} />
      </Switch>
    </div>
  );
}

export default App;
