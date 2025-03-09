
import axios from 'axios'
import {useEffect, useState} from 'react'
import './App.css'
import React from 'react';
import ReactLoading from 'react-loading';

import FavPoke from './components/FavPoke'

function App() {
  
  const [poke, setPoke] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  useEffect(() => {

    let abortController = new AbortController();
     
    const loadPoke = async () => {
      try {

        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`, {
            signal: abortController.signal
        });
      

        setPoke(response.data);
        setError("");

      } catch (error) {
        setError("Something went wrong", error);  
      } finally {
        setLoading(false);
      }
    }

    loadPoke();

    return () => {
      abortController.abort();
    }

  }, [number])

  console.log(poke);

  const prevPoke = () => {
    setNumber((number=>number - 1));
  }

  const nextPoke = () => {
    setNumber((number=>number + 1));
  }

  const addFav = () => {
    setFav((oldState) => [...oldState, poke]);
  }

  return (
    <div className="max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow white:bg-gray-800 dark:border-gray-700 ">
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        <div>
          {loading ? <p>Loading...</p> :
          <>
            <h1>{poke?.name}</h1>
            <button onClick={addFav}>Add to Favorites</button>
            <br />
            <img src={poke?.sprites?.other?.home.front_default} alt={poke?.name} />
            <ul>
              {poke?.abilities?.map((abil,idx) => (
                <li key={idx}>{abil.ability.name}</li>
              ))}
            </ul>
            <button onClick={prevPoke}>Previouns</button>
            <button onClick={nextPoke}>Next</button>
            </>
          }
        </div>
        <div>
          <h2>Your Favorite Pokemon</h2>
          <br />
          {fav.length === 0 ? <div className='flex h-full justify-center items-center'><p>No Favorite Pokemon</p></div> : <FavPoke fav={fav} />}
        </div>
      </div>
    </div>
  )
}

export default App
function loadPoke() {
  throw new Error('Function not implemented.');
}

