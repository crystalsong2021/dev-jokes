// Allows user to submit joke to storr in their database
import React, { useState } from 'react';
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function SubmitJokes({documentID, updateJokes}) {

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
    updateJokes({
      question: question,
      answer: punchline
    });
  }
  return (
    <div>
      <p>
        Got a cool joke? Save it here...
      </p>
      <TextField
        style={{padding: 5, margin: '5px'}}
        placeholder={question}
        onChange={ (event) => {
          setQuestion(event.target.value);
        }}
      />
      <TextField
        style={{padding: 5, margin: '5px'}}
        placeholder={punchline}
        onChange={ (event) => {
          setPunchline(event.target.value);
        }}
      />
      {
        saveJoke
        ? <Button style={{padding: 5}}> Your awesome joke is saved </Button>
        : <Button
            style={{padding: 5, margin: "5px", position:"relative", top:"25px"}}
            variant="outlined"
            onClick={createJoke}
          >
            Submit Joke
          </Button>
      }
    </div>
  )
}

export default SubmitJokes;