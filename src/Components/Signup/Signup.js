import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../olx-logo.png";
import { FirebaseContext } from "../../Store/Context";
import "./Signup.css";

export default function Signup() {
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { firebase } = useContext(FirebaseContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setuserData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then((result) => {
        result.user.updateProfile({ displayName: userData.name }).then(() => {
          firebase.firestore().collection("users").add({
            id: result.user.uid,
            username: userData.name,
            phone: userData.phone,
          });
        });
      })

      .then(history.push("/login"));
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            onChange={(e) => handleChange(e)}
            value={userData.name}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e) => handleChange(e)}
            value={userData.email}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            onChange={(e) => handleChange(e)}
            value={userData.phone}
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
            value={userData.password}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a href="/#">Login</a>
      </div>
    </div>
  );
}
