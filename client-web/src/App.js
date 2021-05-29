import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { HomePage, SignInPage, SignUpPage } from './pages';

import { Header, LoginSuccess } from './components';
import { getAuth } from './redux/user/user-action';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
