import React, { useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { authContext, FirebaseContext } from "../../Store/Context"
import { Link, useHistory } from 'react-router-dom';

function Header() {
  const { user } = useContext(authContext)
  const { firebase } = useContext(FirebaseContext)

  const history = useHistory()


  function signOut() {
    firebase.auth().signOut()
    history.push("/login")
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span style={{ cursor: "pointer" }}>{user ? `Welcome ${user.displayName}` : <Link to="/login">Login</Link>}</span>
          <hr />
        </div>
        {user &&  <span onClick={signOut} style={{ cursor: "pointer" }} ><Link to="/login">Log Out</Link></span>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <Link to="/create"><span>SELL</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
