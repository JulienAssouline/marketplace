import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignupForm from "./SignupForm"

function SignUp() {
  return (
    <Router>
      <Route path="/signup" exact component={SignupForm} />
    </Router>
    )
}
export default SignUp