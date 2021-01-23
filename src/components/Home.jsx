import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import firebase from 'firebase/app';
import 'firebase/firestore';
import UpdateForm from './UpdateForm';
import { withRouter } from 'react-router';

const Home = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const [spots, setSpot] = useState([]);
  const [input, setInput] = useState('');
  const [updateItem, setUpdateItem] = useState('');

  const db = firebase.firestore();

  //データ取得
  const fetchSpotsData = () => {
    //コレクションからuidがcurrentUser.uidであるドキュメントを取得
    db.collection('spots')
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.data()) {
          const newSpots = [];
          newSpots.push(...doc.data().spot);
          setSpot(newSpots);
        }
      });
  };

  //マウント時データ取得
  useEffect(() => {
    fetchSpotsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spotDelete = (id) => {
    const newSpots = spots.filter((_, idx) => idx !== id);

    db.collection('spots')
      .doc(currentUser.uid)
      .set({
        spot: newSpots,
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
        setUpdateItem('');
      });
  };

  const inputClickHandler = () => {
    if (input === '') {
      alert('空欄はだめ！！');
      return;
    }
    spotAdd();
    setInput('');
  };

  //更新処理
  const spotUpdate = (id) => {
    const newSpot = spots.slice();
    newSpot[id] = updateItem;

    db.collection('spots')
      .doc(currentUser.uid)
      .set({
        spot: newSpot,
      })
      .then(() => {
        setUpdateItem('');
        fetchSpotsData();
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
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          onClick={() => {
            inputClickHandler();
          }}
        >
          追加
        </button>
      </div>
      <div>
        <h2>Spots一覧</h2>
        {spots.map((spot, id) => (
          <div key={id}>
            <div>
              {id}: {spot}
              <button
                onClick={() => {
                  spotDelete(id);
                }}
              >
                削除
              </button>
              <UpdateForm
                spotUpdate={spotUpdate}
                setUpdateItem={setUpdateItem}
                updateItem={updateItem}
                id={id}
              />
            </div>
          </div>
        ))}
      </div>

      {/* <Button
        style={{ margin: '20px 0' }}
        color='primary'
        onClick={() => {
          auth.signOut();
        }}
      >
        ログアウト
      </Button> */}
    </div>
  );
};
export default withRouter(Home);
