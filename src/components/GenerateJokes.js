import React, { useState } from 'react';
import { collection, doc, addDoc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

function GenerateJokes({documentID}) {
  console.log('documentID generatejokes->', documentID)
  const [punchJoke, setPunchJoke] = useState("");

  const punchJokes = async() => {
    const joke = await fetch('https://backend-omega-seven.vercel.app/api/getjoke');
    const responseJoke = await joke.json();
    console.log(responseJoke[0])
    setPunchJoke(responseJoke[0])

  };
  const createJoke = async () => {
    const documentRef = doc(db, "users", documentID);
    const res = await updateDoc(documentRef, {
        jokes: arrayUnion({
            question: punchJoke.question,
            punchline: punchJoke.punchline
        })

    });
  }
  return(
    <div>
      <button onClick={punchJokes}> Punch Jokes </button>
      {
        punchJoke &&
        <div>
          <h5>{punchJoke.question}</h5>
          <p>{punchJoke.punchline}</p>
          <button onClick={createJoke}>save</button>
        </div>
      }
    </div>
  )
}

export default GenerateJokes;