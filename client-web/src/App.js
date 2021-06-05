import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  HomePage,
  SignInPage,
  SignUpPage,
  ForgotPasswordPage,
  BookingsPage,
  GiftCardsPage,
  WishlistPage,
  ReviewsPage,
  RewardsPage,
  SettingsPage
} from './pages';

import { Header, LoginSuccess } from './components';
import { verifyAuth } from './redux/user/user-action';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyAuth());
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
        <Route exact path='/forgot-password' component={ForgotPasswordPage} />
        <Route exact path='/bookings' component={BookingsPage} />
        <Route exact path='/gift-cards' component={GiftCardsPage} />
        <Route exact path='/wishlist' component={WishlistPage} />
        <Route exact path='/reviews' component={ReviewsPage} />
        <Route exact path='/rewards' component={RewardsPage} />
        <Route exact path='/settings' component={SettingsPage} />
      </Switch>
    </div>
  );
}

export default App;
