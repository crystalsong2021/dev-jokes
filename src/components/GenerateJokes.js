import React, { useState } from 'react';
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import { BsSave } from "react-icons/bs";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

function GenerateJokes({documentID, updateJokes}) {
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
    updateJokes(punchJoke);
  }
  return(
    <div>
      <Button variant="outlined" onClick={punchJokes}>
        Click me... to generate joke
      </Button>
      {
        punchJoke &&
        <div>
          <h5>{punchJoke.question}</h5>
          <p>{punchJoke.punchline}</p>
          {
            saveJoke
            ? <Button>saved</Button>
            : (
                <Tooltip title="Save">
                  <IconButton>
                    <BsSave
                      style = {{cursor: "pointer"}}
                      onClick={createJoke}
                    />
                  </IconButton>

                </Tooltip>

              )

          }
        </div>
      }
    </div>
  )
}

export default GenerateJokes;