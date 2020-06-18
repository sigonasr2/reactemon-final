import React, { useState, useContext, useEffect } from 'react';
import PokemonSearchResult from '../PokemonSearch/PokemonSearchResults.js'
import {PokemonData} from '../PokemonAppContext';

const SimilarTypesPage = (props) => {
  const context = useContext(PokemonData)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const url = `https://pokeapi.co/api/v2/type/${context.currentPokemonType}`
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
  } else if (pokemon.length === 0) {
    return <div>No data</div>
  } else {
    return (
      <div>
        <h1>{`${context.currentPokemonType[0].toUpperCase()+context.currentPokemonType.slice(1)} Type Pokemon`}</h1>
        <div>
          <PokemonSearchResult pokemon={pokemon} />
        </div>
      </div>
    );
  }
}

export default SimilarTypesPage