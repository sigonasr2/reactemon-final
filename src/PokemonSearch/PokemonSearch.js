import React, { useState, useEffect } from 'react'
import PokemonSearchResult from './PokemonSearchResults.js'

const PokemonSearch = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const url = `https://pokeapi.co/api/v2/${props.search.split('=')[0]}/${props.search.split('=')[1]}`
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPokemon(result.pokemon);
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
  } else {
    return (
      <PokemonSearchResult pokemon={pokemon} />
    );
  }
}

export default PokemonSearch

