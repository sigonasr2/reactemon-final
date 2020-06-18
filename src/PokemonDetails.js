import React, { useContext, useEffect, useState } from 'react'
import { PokemonData } from './PokemonAppContext.js'
import PokemonSearchResult from './PokemonSearch/PokemonSearchResults.js'


const PokemonDetails = (props) => {
  const context = useContext(PokemonData)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const url = `https://pokeapi.co/api/v2/pokemon/${context.currentPokemon}`
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPokemon(result);
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
		<PokemonSearchResult pokemon={[{...pokemon,pokemon:{url:url}}]}/>
    );
  }
}

export default PokemonDetails