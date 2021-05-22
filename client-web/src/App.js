import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { HomePage, SignInPage } from './pages';

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
