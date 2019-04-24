import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginForm from "./LoginForm"

function Login() {
  return (
    <Router>
      <Route path="/login" exact component={LoginForm} />
    </Router>
    )
}
export default Login