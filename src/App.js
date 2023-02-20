import './App.css';
import googleOneTap from 'google-one-tap';
import React, { useEffect, useState} from 'react';
import { db } from './firebase/firebaseConfig';
import { collection, doc, getDoc, setDoc, query, where } from "firebase/firestore";
import SubmitJokes from './firebase/SubmitJoke';

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
    : null
  );

  const jokesRef = collection(db, "users");



  const [loginUser, setLoginUser] = useState(
    localStorage.getItem('loginUser')
      ? JSON.parse(localStorage.getItem('loginUser'))
      : null
  );



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
      console.log('Data--', data)
      setLoginUser(data);
      setDocumentID(data.email);
      localStorage.setItem("loginUser", JSON.stringify(data));
      getJokes();

    });
  }, [loginUser])


    const getJokes = async () => {
      console.log('get Jokes l56-->', documentID)
      const docRef = doc(db, "users", loginUser.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("document data: ", docSnap.data());
        setJokes(docSnap.data().jokes);
      } else {
        const result = await setDoc(doc(jokesRef, loginUser.email), {
          name: loginUser.name,
          email: loginUser.email,
          picture: loginUser.picture,
          jokes: []
        })
        console.log('document data after created: ', result);
      }

      // const result = await query(jokesRef, where("email", "==", "loginUser.email"));
      // console.log('Data-jokes---', result.data());
      // setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))

    };


  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    setLoginUser(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <SubmitJokes documentID={documentID}/>
        {console.log('User: ', loginUser.email)
        }



        {/* listing all the users */}
        {jokes && jokes.map(joke => {
          return <div>
            <h4>Question : {joke.question}</h4>
            <h4>Answer : {joke.answer}</h4>
          </div>
        })}





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
    </div>
  );
}

export default App;
