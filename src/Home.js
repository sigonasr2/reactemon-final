import React, { useState, useContext, useEffect } from 'react';
import PokemonSearchResult from './PokemonSearch/PokemonSearchResults.js'
import { PokemonData } from './PokemonAppContext';

const HomePage = (props) => {
  const context = useContext(PokemonData)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState('')
  const [prevUrl, setPrevUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPokemon(result);
          if (result.next !== null) {
            setNextUrl(result.next)
			  console.log("Next: "+result.next)
          }
          if (result.prevUrl !== null) {
            setPrevUrl(result.previous)
			  console.log("Previous: "+result.previous)
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [url])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (pokemon.length === 0) {
    return <div>No data</div>
  } else {
    return (
      <div>
        <div>
          <h1>Home</h1>
          <h3>View Pokemon - Total: {pokemon.count}</h3>
          <button onClick={() => {setUrl(prevUrl)}} type='button'>Prev 20</button>
          <button onClick={() => {setUrl(nextUrl)}} type='button'>Next 20</button>
          <div className="row">
            <PokemonSearchResult pokemon={pokemon.results.map((p,i) => {

              let x = {
                pokemon: {
                  name: p.name,
                  url: p.url
                },
              }
              return x
            })} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage