import './App.css';
import googleOneTap from 'google-one-tap';
import React, { useEffect, useState} from 'react';
import { db } from './firebase/firebaseConfig';
import { collection, doc, getDoc, setDoc, arrayRemove, updateDoc } from "firebase/firestore";
import SubmitJokes from './components/SubmitJoke';
import GenerateJokes from './components/GenerateJokes';
import SavedJokes from './components/SavedJokes';


const options = {
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    auto_select: false,
    cancel_on_tap_outside: false,
    context: "signin"
};

function App() {
  const [jokes,setJokes] = useState([]);
  const [documentID, setDocumentID] = useState(
    localStorage.getItem('loginUser')
    ? JSON.parse(localStorage.getItem('loginUser')).email
    : "janejoe@unknown.com"
  );
  const [loginUser, setLoginUser] = useState(
    localStorage.getItem('loginUser')
      ? JSON.parse(localStorage.getItem('loginUser'))
      : null
  );

  const getJokes = async () => {
    console.log('getJokes l 30')
    const docRef = doc(db, "users", documentID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('getting jokes')
      setJokes(docSnap.data().jokes);
    } else {
        await setDoc(doc(jokesRef, documentID), {
          name: loginUser.name,
          email: loginUser.email,
          picture: loginUser.picture,
          jokes: []
      })
    };
  };

  const updateJokes = (punchJoke) => {
    setJokes([punchJoke, ...jokes]);
  };

  const deleteJoke = async (index) => {
    console.log('deleteJoke at index: ', index)
    const documentRef = doc(db, "users", documentID);
    await updateDoc(documentRef, {
      jokes: arrayRemove(jokes[index])
    });
    getJokes();
  };

  const jokesRef = collection(db, "users");

  useEffect(() => {
    console.log('useEffect')
    getJokes();
    googleOneTap(options, async (response) => {
      const res = await fetch("/api/google-login", {
        method: "POST",
        body: JSON.stringify({
          token: response.credential,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log('data-')
      setLoginUser(data);
      setDocumentID(data.email);
      localStorage.setItem("loginUser", JSON.stringify(data));
      getJokes();
      console.log('useEffect1')

    });
  }, [loginUser])

  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    setLoginUser(null);
  };

  return (
    <div className="App">
      <div className="glass">
        <header className="App-header">
          <button className="btn-logout" onClick={handleLogout}>
            logout
          </button>
          <div>
            {loginUser ? (
              <div>
                <h4>
                  Happy Day to you {loginUser.name}
                </h4>
                <p>
                  Make someone laugh today with these jokes.
                  It will make you feel good too!
                </p>
              </div>
            ) : (
              <div>Not logged in</div>
            )}
          </div>

        </header>
        <div className="bodyContainer">
          <div className="SavedJokes">
              <SavedJokes
                jokes={jokes}
                deleteJoke={deleteJoke}
              />
          </div>
          <div className="GenerateJokes">
            <GenerateJokes
              documentID={documentID}
              updateJokes={updateJokes}
            />
          </div>
          <div className="SubmitJokes">
            <SubmitJokes
              documentID={documentID}
              updateJokes={updateJokes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
