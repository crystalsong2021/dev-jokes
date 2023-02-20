import React, { useState } from 'react';

function SavedJokes({jokes}) {
  return (
    <div>
    {/* listing all the users */}
    {
      jokes && jokes.map((joke, i) => {
        return (
          <div className="jokeContainer" key={i}>
            <h4>Question : {joke.question}</h4>
            <h4>Punchline : {joke.punchline}</h4>
          </div>
        )
      })
    }
    </div>
  )
}

export default SavedJokes;