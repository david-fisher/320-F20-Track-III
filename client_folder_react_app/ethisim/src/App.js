import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Register from './pages/register_account';

export default function App() {
  return (
    <Router>
        <Route exact path="/">
          <Redirect to="/register_account" />
        </Route>

        <Switch>
          <Route path="/register_account">
            <Register />
          </Route>
        </Switch>
    </Router>
  );
}
