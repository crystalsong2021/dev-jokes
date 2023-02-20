import React, { useState } from 'react';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';

function SavedJokes({ jokes }) {
  const [current, setCurrent] = useState(0);
  const length = jokes.length - 1;

  const nextJoke = () => {
    setCurrent(current === length ? 0: current + 1);
  }

  const prevJoke = () => {
    setCurrent(current === 0 ? length : current - 1);
  }

  return (
    <div className="jokeContainer">
    {/* listing all the users */}
    < BsFillArrowLeftSquareFill className="left-arrow" onClick={prevJoke} />
    < BsFillArrowRightSquareFill className="right-arrow" onClick={nextJoke}/>
    {
      jokes && jokes.map((joke, index) => {
        return (
          <div className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {
              index === current &&
              (
                <>
                  <h4>{joke.question}</h4>
                  <h4>Punchline : {joke.punchline}</h4>

                </>
              )
            }
          </div>
        )
      })
    }
    </div>
  )
}

export default SavedJokes;