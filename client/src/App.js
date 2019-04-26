import React from 'react';
import './App.css';

import { ApolloProvider} from "react-apollo"
import apolloClient from "./apolloclient"
import { BrowserRouter as Router, Route } from "react-router-dom";


import Items from "./components/Items"
import Users from "./components/Users"
import LandingPage from "./components/LandingPage"
import SignupForm from "./components/SignupForm"
import LoginForm from "./components/LoginForm"
import Home from "./components/Home"
import AddItems from "./components/AddItems"
import UserItems from "./components/UserItems"
import BuyItems from "./components/BuyItems"



              // <Route path="/about/" component={About} />
              // <Route path="/Contact/" component={Contact} />


function App() {

  return (

    <ApolloProvider client={apolloClient}>
    <div className = "App">
    <Router>
      <Route path="/" exact component={LandingPage} />
      <Route path="/signup" exact component={SignupForm} />
      <Route path="/login" exact component={LoginForm} />
      <Route path="/home" exact component = {Home} />
      <Route path="/items" exact component = {Items} />
      <Route path = "/add-items" exact component = {AddItems} />
      <Route path="/users" exact component = {Users} />
      <Route path = "/user-items" exact component = {UserItems} />
      <Route path = "/buy-items" exact component = {BuyItems} />
    </Router>
    </div>
    </ApolloProvider>
  );
}

export default App;
