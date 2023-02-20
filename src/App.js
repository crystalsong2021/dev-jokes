import './App.css';
import googleOneTap from 'google-one-tap';
import React, { useEffect, useState} from 'react';
import { db } from './firebase/firebaseConfig';
import { collection, doc, getDoc, setDoc, query, where } from "firebase/firestore";
import SubmitJokes from './firebase/SubmitJoke';
import GenerateJokes from './components/GenerateJokes'

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
      const docRef = doc(db, "users", documentID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setJokes(docSnap.data().jokes);
      } else {
        const result = await setDoc(doc(jokesRef, documentID), {
          name: loginUser.name,
          email: loginUser.email,
          picture: loginUser.picture,
          jokes: []
        })
      }
    };

    const jokesRef = collection(db, "users");

    useEffect(() => {
        googleOneTap(options, async (response) => {
          // console.log(response);
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
          // console.log('Data--', data)
          setLoginUser(data);
          setDocumentID(data.email);
          localStorage.setItem("loginUser", JSON.stringify(data));
          getJokes();

        });
    }, [loginUser])

  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    setLoginUser(null);
  };

  return (
    <div className="App">
      <div className="Glass">
        <header className="App-header">
          <div>
            {loginUser ? (
              <div>
                <h3>
                  You "{loginUser.name}" logged in as {loginUser.email}
                </h3>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div>Not logged in</div>
            )}
          </div>

        </header>
        <div className="Body">
          <div className="GenerateJokes">
            <GenerateJokes documentID={documentID}/>
          </div>

          <div className="SubmitJokes">
            <SubmitJokes documentID={documentID}/>
          </div>

          <div className="SavedJokes">
            {/* listing all the users */}
            {jokes && jokes.map((joke, i) => {
              return <div key={i}>
                <h4>Question : {joke.question}</h4>
                <h4>Punchline : {joke.punchline}</h4>
              </div>
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
