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
  const fetchSpotsData = () => {
    console.log('発火');
    //コレクションからuidがcurrentUser.uidであるドキュメントを取得
    const spotsRef = db.collection('spots').where('uid', '==', currentUser.uid);
    spotsRef.get().then((snapshot) => {
      const newSpots = [];
      snapshot.forEach((doc) => {
        console.log(doc.data());
        newSpots.push(...doc.data().spot);
        console.log(newSpots);
      });
      setSpot(newSpots);
    });
  };

  //マウント時データ取得
  useEffect(() => {
    fetchSpotsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spotDelete = (spot) => {
    db.collection('spots')
      .doc(currentUser.uid)
      .update({
        spot: firebase.firestore.FieldValue.arrayRemove(spot),
      })
      .then(() => {
        fetchSpotsData();
        alert('削除したよ！');
      })
      .catch(() => {
        alert('失敗したよ！');
      });
  };

  return (
    <div>
      <h1>ようこそ {currentUser.displayName} !!</h1>
      <h1>{currentUser.uid}</h1>
      <div>
        <h2>Spots一覧</h2>
        {spots.map((spot, idx) => (
          <div key={idx}>
            <div>
              {idx}: {spot}
              <button
                onClick={() => {
                  spotDelete(spot);
                }}
              >
                削除
              </button>
            </div>
          </div>
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
