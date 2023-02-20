// Allows user to submit joke to storr in their database
import React, { useState } from 'react';
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

function SubmitJokes({documentID}) {

  const documentRef = doc(db, "users", documentID);
  const [question, setQuestion] = useState("question...");
  const [punchline, setPunchline] = useState("punchline...");
  const [saveJoke, setSaveJoke] = useState(false);

  const createJoke = async () => {
    await updateDoc(documentRef, {
      jokes: arrayUnion({
        question: question,
        answer: punchline
      })
    });
    setQuestion("");
    setPunchline("");
    setSaveJoke(true);
  }
  return (
    <div>
      <input
        placeholder={question}
        onChange={ (event) => {
          setQuestion(event.target.value);
        }}
      />
      <input
        placeholder={punchline}
        onChange={ (event) => {
          setPunchline(event.target.value);
        }}
      />
      {
        saveJoke
        ? <button> Your awesome joke is saved </button>
        : <button onClick={createJoke}> Submit Joke </button>
      }
    </div>
  )
}

export default SubmitJokes;