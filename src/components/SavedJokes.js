import React, { useState } from 'react';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';
// import { BiEdit } from 'react-icons/bi';
import { MdDeleteForever } from "react-icons/md";

function SavedJokes({ jokes, deleteJoke }) {
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
      <p>All your saved jokes are shown here</p>
      {/* listing all the users */}
      < BsFillArrowLeftSquareFill className="left-arrow" onClick={prevJoke} />
      < BsFillArrowRightSquareFill className="right-arrow" onClick={nextJoke} />
      {
        jokes && jokes.map((joke, index) => {
          return (
            <div className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {
                index === current &&
                (
                  <div style={{background:"yellow"}}>
                    <MdDeleteForever
                      style={{
                        position:'relative',
                        left: '48%',
                        top: '5',
                        cursor:'pointer',
                      }}
                      onClick={()=> deleteJoke(index)}
                    />
                    <h4 style={{margin:"3px"}}>{joke.question}</h4>
                    <h4>Punchline : </h4> {joke.punchline}

                  </div>
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