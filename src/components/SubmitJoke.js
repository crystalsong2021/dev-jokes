// Allows user to submit joke to storr in their database
import React, { useState } from 'react';
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function SubmitJokes({documentID, updateJokes}) {
  const documentRef = doc(db, "users", documentID);
  const [punchJoke, setPunchJoke] = useState({question: "", punchline: ""});
  const [saveJoke, setSaveJoke] = useState(false);

  const createJoke = async (event) => {
    event.preventDefault();
    setPunchJoke({question:"", punchline: ""});
    await updateDoc(documentRef, {
      jokes: arrayUnion(punchJoke)
    });
    setSaveJoke(true);
    updateJokes(punchJoke);
  }

  return (
    <div>
      <p>
        Got a cool joke? Save it here...
      </p>
      <form onSubmit={createJoke}>
        <TextField
          style={{padding: 5, margin: '5px'}}
          placeholder="question..."
          value={punchJoke.question}
          name="question"
          onChange={ (event) => {
            setPunchJoke({...punchJoke, [event.target.name]: event.target.value });
          }}
        />
        <TextField
          style={{padding: 5, margin: '5px'}}
          placeholder="punchline..."
          value={punchJoke.punchline}
          name="punchline"
          onChange={ (event) => {
            setPunchJoke({...punchJoke, [event.target.name]: event.target.value });
          }}
        />
        {
          saveJoke
          ? <Button style={{padding: 5}}> Your awesome joke is saved </Button>
          : <Button
              style={{padding: 5, margin: "5px", position:"relative", top:"25px"}}
              variant="outlined"
              type="submit"
            >
              Submit Joke
            </Button>
        }
      </form>
    </div>
  )
}

export default SubmitJokes;