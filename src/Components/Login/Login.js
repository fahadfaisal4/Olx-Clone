import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Login.css";
import { FirebaseContext } from "../../Store/Context";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { firebase } = useContext(FirebaseContext);
  const history = useHistory()

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(loginData);
    firebase
      .auth()
      .signInWithEmailAndPassword(loginData.email,loginData.password).then(()=>{
        alert("Logged In")
      }).then(
        history.push("/home")
      )
      .catch((err)=>{
        alert(err.message)
      })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img alt="Login_logo" width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e) => handleChange(e)}
            value={loginData.email}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e) => handleChange(e)}
            value={loginData.password}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link path="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
