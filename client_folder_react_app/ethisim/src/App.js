import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Signup from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

export default function App() {
  return (
    <Router>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/dashboard" component={Dashboard}/>
    </Router>
  );
}
