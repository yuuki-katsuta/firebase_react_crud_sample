import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../base';
import { AuthContext } from '../auth/AuthProvider';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Button from '@material-ui/core/Button';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [spots, setSpot] = useState([]);
  const [input, setInput] = useState('');

  const db = firebase.firestore();

  //データ取得
  const fetchSpotsData = () => {
    console.log('発火');
    //コレクションからuidがcurrentUser.uidであるドキュメントを取得
    db.collection('spots')
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        const newSpots = [];
        newSpots.push(...doc.data().spot);
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

  const spotAdd = () => {
    const newSpots = [...spots];
    newSpots.push(input);

    db.collection('spots')
      .doc(currentUser.uid)
      .set({
        spot: newSpots,
      })
      .then(() => {
        fetchSpotsData();
      });
  };

  const IinputClickHandler = () => {
    if (input === '') {
      alert('空欄はだめ！！');
      return;
    }
    spotAdd();
    setInput('');
  };

  return (
    <div>
      <h1>ようこそ {currentUser.displayName} !!</h1>
      <h1>{currentUser.uid}</h1>
      <div>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          onClick={() => {
            IinputClickHandler();
          }}
        >
          追加
        </button>
      </div>
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
