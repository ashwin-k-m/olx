import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../store/postContext';
import { firebaseContext } from '../../store/firebaseContext';

function View() {
  const [userDetails, setUserDetails] = useState()
  const { postDetails } = useContext(PostContext)
  const { firebase } = useContext(firebaseContext)

  useEffect(() => {
    if (!postDetails || !postDetails.userId) return;
    const { userId } = postDetails;
    firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
      res.forEach(doc => {
        setUserDetails(doc.data())
      });
    })
  }, [postDetails])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src="../../../Images/R15V3.jpg"
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>Tue May 04 2021</span>
        </div>
        {userDetails && (<div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.userName}</p>
          <p>{userDetails.phone}</p>
        </div>)}
      </div>
    </div>
  );
}
export default View;
