import React, { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./Pages/Signup";
import Login from "./Pages/Login"
import Home from "./Pages/Home";
import Create from "./Pages/Create"
import ViewPost from "./Pages/ViewPost"
import { authContext, FirebaseContext } from "./Store/Context";

function App() {

  const { setUser } = useContext(authContext)
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })

  })


  return (
    <div>
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/view">
          <ViewPost />
        </Route>
        
      </Router>
    </div>
  );
}

export default App;
