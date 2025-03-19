import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { firebaseContext, AuthContext } from '../../store/firebaseContext';
import { useHistory } from 'react-router-dom';

const Create = () => {
  const history = useHistory();
  const { firebase } = useContext(firebaseContext)
  const { user } = useContext(AuthContext)
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date();
  const handleSubmit = () => {
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ ref }) => {
      ref.getDownloadURL().then((url) => {
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId: user.uid,
          createdAt: date.toDateString()
        })
        history.push('/');
      })
    })
  }
  return (
    <Fragment>
      <Header />
      <div>
        <div className="centerDiv" style={{ color: 'rgb(88, 88, 88)', fontWeight: '700', fontSize: '1rem' }}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              onChange={(e) => setName(e.target.value)}
              id="fname"
              name="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              id="fname"
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              id="fname"
              name="Price"
            />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
            <br />
            <input onChange={(e) => {
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button type="button" onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
