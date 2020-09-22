import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from './pages/login';

export default function App() {
  return (
    <Router>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
    </Router>
  );
}


