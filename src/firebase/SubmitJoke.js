// Allows user to submit joke to storr in their database
import React, { useState } from 'react';
import { collection, doc, addDoc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from './firebaseConfig';

function SubmitJokes({documentID}) {
    console.log('Document ID-->', documentID)

    const documentRef = doc(db, "users", documentID);

    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");
    const createJoke = async () => {
        const res = await updateDoc(documentRef, {
            jokes: arrayUnion({
                question: newQuestion,
                answer: newAnswer
            })

        })

        // console.log("result-->", res.id)
    }

    return (
        <div>
            <input
                placeholder="Question..."
                onChange={ (event) => {
                    setNewQuestion(event.target.value);
                }}
            />
            <input
                placeholder="Answer..."
                onChange={ (event) => {
                    setNewAnswer(event.target.value);
                }}
            />


            <button onClick={createJoke}> Submit Joke </button>
        </div>
    )
}

export default SubmitJokes;