import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../base';
import { AuthContext } from '../auth/AuthProvider';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Button from '@material-ui/core/Button';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [spots, setSpot] = useState([]);

  const db = firebase.firestore();

  //データ取得
  useEffect(() => {
    console.log('発火');
    const spotsRef = db.collection('spots').where('uid', '==', currentUser.uid);
    spotsRef.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });
  }, [db, currentUser]);

  return (
    <div>
      <h1>ようこそ {currentUser.displayName} !!</h1>
      <h1>{currentUser.uid}</h1>
      <div>
        <h2>Spots</h2>
        {spots.map((spot, idx) => (
          <div key={idx}>{spot}</div>
        ))}
      </div>

      <Button
        style={{ margin: '20px 0' }}
        color='primary'
        onClick={() => {
          auth.signOut();
        }}
      >
        ログアウト
      </Button>
    </div>
  );
};
export default Home;
