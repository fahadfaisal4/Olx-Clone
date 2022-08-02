import React, { useState, Fragment, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {authContext,FirebaseContext} from "../../Store/Context"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Create = () => {

  const [content, setContent] = useState({
    name: "",
    category: "",
    price: ""
  });

  const [image, setImage] = useState()
  const {user} = useContext(authContext)
  const {firebase} = useContext(FirebaseContext)

  function handleChange(e) {
    const { name, value } = e.target;
    setContent((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  const date = new Date()
  const history = useHistory()

  function handleSubmit(event) {
    event.preventDefault()
    firebase.storage().ref(`/content/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then(url=>{
        firebase.firestore().collection('products').add({
          name: content.name,
          price: content.price,
          category: content.category,
          userId: user.uid,
          url: url,
          createdAt: date.toDateString()
        })
      })
    })
    history.push("/home")
  }


  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
      <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            onChange={(e) => handleChange(e)}
            value={content.name}
          />
          <br />
          <label htmlFor="fcat">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fcat"
            name="category"
            onChange={(e) => handleChange(e)}
            value={content.category}
          />
          <br />
          <label htmlFor="fprice">Price</label>
          <br />
          <input className="input"
            onChange={(e) => handleChange(e)}
            type="number" id="fprice" name="price" value={content.price} />
          <br />
        <br />
        <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>
  
          <br />
          <input
            type="file"
            onChange={(e) => (setImage(e.target.files[0]))} />
          <br />
          <button className="uploadBtn">Upload and Submit</button>
          <br />
        </form>

      </div>
    </Fragment>
  );
};

export default Create;

