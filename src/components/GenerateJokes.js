import React, { useState } from 'react';
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

function GenerateJokes({documentID}) {
  const [punchJoke, setPunchJoke] = useState("");
  const [saveJoke, setSaveJoke] = useState(false);

  const punchJokes = async() => {
    const joke = await fetch('https://backend-omega-seven.vercel.app/api/getjoke');
    const responseJoke = await joke.json();
    console.log(responseJoke[0])
    setPunchJoke(responseJoke[0])
    if (saveJoke) {
      setSaveJoke(false)
    }
  };
  const createJoke = async () => {
    const documentRef = doc(db, "users", documentID);
    await updateDoc(documentRef, {
        jokes: arrayUnion({
            question: punchJoke.question,
            punchline: punchJoke.punchline
        })
    });
    setSaveJoke(true);
  }
  return(
    <div>
      <button onClick={punchJokes}> Punch Jokes </button>
      {
        punchJoke &&
        <div>
          <h5>{punchJoke.question}</h5>
          <p>{punchJoke.punchline}</p>
          {
            saveJoke
            ? <button>saved</button>
            : <button onClick={createJoke}>save</button>
          }
        </div>
      }
    </div>
  )
}

export default GenerateJokes;