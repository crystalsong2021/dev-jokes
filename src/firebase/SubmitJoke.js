// Allows user to submit joke to storr in their database
import React, { useState } from 'react';
import { collection, doc, addDoc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from './firebaseConfig';

function SubmitJokes({documentID}) {
    console.log('Document ID-->', documentID)

    const documentRef = doc(db, "users", documentID);

    const [question, setQuestion] = useState("");
    const [punchline, setPunchline] = useState("");
    const createJoke = async () => {
        const res = await updateDoc(documentRef, {
            jokes: arrayUnion({
                question: question,
                answer: punchline
            })

        });
        setQuestion("");
        setPunchline("");
    }

    return (
        <div>
            <input
                placeholder="Question..."
                onChange={ (event) => {
                    setQuestion(event.target.value);
                }}
            />
            <input
                placeholder="Punchline..."
                onChange={ (event) => {
                    setPunchline(event.target.value);
                }}
            />


            <button onClick={createJoke}> Submit Joke </button>
        </div>
    )
}

export default SubmitJokes;