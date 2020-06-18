import React, { useState, useContext, useEffect } from 'react'
import {PokemonData} from '../PokemonAppContext';

const Berry = (props) => {
  const context = useContext(PokemonData)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [berry, setBerry] = useState([]);
	//console.log(props.berry)
  const [url, setUrl] = useState(props.berry.berry.url)
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setBerry(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [url])
  if (error) {
    return <React.Fragment/>;
  } else if (!isLoaded) {
    return <React.Fragment/>;
  } else if (berry.length === 0) {
    return <div>No data</div>
  } else {
	var goodBerry = "";
	//console.log(props)
	for (var i=0;i<props.type.length;i++) {
		if (berry.natural_gift_type.name===props.type[i].type.name) {
			goodBerry=<img className="link" onClick={()=>{context.addItemToGroceryList({name:berry.name[0].toUpperCase()+berry.name.slice(1)+" Berry",quantity:1})}} alt="Click to add to cart!" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/"+berry.name+"-berry.png"}/>
			break;
		}
	}
	return (
		<React.Fragment>
			{goodBerry}
		</React.Fragment>
	)
  }
}

const GoodBerries = (props) => {
	//console.log(props)
	return (
		<React.Fragment>
		{props.berry.map((b, i) =>
			<Berry type={props.type} berry={b}/>
		)}
		</React.Fragment>
	);
}

const BerryData = (props) => {
  const context = useContext(PokemonData)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [berry, setBerry] = useState([]);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/berry/?limit=64')
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setBerry(result);
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
  } else if (berry.length === 0) {
    return <div>No data</div>
  } else {
	  return (
		<GoodBerries type={props.types} berry={berry.results.map((b)=>{
			let x = {
				berry: {
					name: b.name,
					url: b.url
				},
			}
			return x
		})
		}/>
	  )
  }
	//https://pokeapi.co/api/v2/berry/?limit=64
}

const SpeciesData = (props) => {
  const context = useContext(PokemonData)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [url, setUrl] = useState(props.url)
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
  //console.log(pokemon.flavor_text_entries)
  var usableEntry = "";
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (pokemon.length === 0) {
    return <div>No data</div>
  } else {
	  for (var i=pokemon.flavor_text_entries.length-1;i>=0;i--) {
		  var entry = pokemon.flavor_text_entries[i];
		if (entry.language.name==="en") {
			usableEntry = entry.flavor_text
			break;
		}		
	  }
	  return (
		<div id={props.id}>
		{usableEntry}
		</div>
	  )
  }
}

const Pokemon = (props) => {
  const context = useContext(PokemonData)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [url, setUrl] = useState(props.pokemon.pokemon.url)
  
  function GetTypeImage(type) {
	  var image_folder = ""
	  switch (type.toLowerCase()) {
		  case "bug":{return "https://snipboard.io/JKNud5.jpg";}
		  case "dark":{return "https://snipboard.io/Dsamd7.jpg";}
		  case "dragon":{return "https://snipboard.io/6h3fRl.jpg";}
		  case "electric":{return "https://snipboard.io/FGthec.jpg";}
		  case "fairy":{return "https://snipboard.io/3yHceJ.jpg";}
		  case "fighting":{return "https://snipboard.io/A24gIu.jpg";}
		  case "fire":{return "https://snipboard.io/iXMvLx.jpg";}
		  case "flying":{return "https://snipboard.io/n6cloE.jpg";}
		  case "ghost":{return "https://snipboard.io/Lbq8Hg.jpg";}
		  case "grass":{return "https://snipboard.io/0UXhiJ.jpg";}
		  case "ground":{return "https://snipboard.io/OTWC8m.jpg";}
		  case "ice":{return "https://snipboard.io/HctKUC.jpg";}
		  case "normal":{return "https://snipboard.io/1IrhDK.jpg";}
		  case "poison":{return "https://snipboard.io/ic5eYz.jpg";}
		  case "psychic":{return "https://snipboard.io/V7QgZ0.jpg";}
		  case "rock":{return "https://snipboard.io/Sf8Lvq.jpg";}
		  case "steel":{return "https://snipboard.io/2peJxP.jpg";}
		  case "water":{return "https://snipboard.io/ex9D7c.jpg";}
	  }
  }
  if (props.name) {
	  props.pokemon.pokemon.url = `https://pokeapi.co/api/v2/pokemon/${props.name}`
  }
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
	  //console.log(pokemon)
	return (
		<div className=" card bg-dark">
		<div className="row">
		<div className="col-md-4">
		<img className="fit-image shadow-lg" src={pokemon.sprites.front_default}/>
		<div className="row">
			<div className="col-md-12">
				<b>Favorite Berries:</b> 
			</div>
		</div>
			<div className="col-md-12">
				<BerryData types={pokemon.types}/>
			</div>
		</div>
		<div className="col-md-8">
		<div className="row">
			<div className="col-md-4">
				<h2>#{pokemon.id}</h2>
			 </div>
			<div className="col-md-8">
			  {pokemon.types.map((type)=>{
				  return (<span><img className="type-small link" id={type.type.name} onClick={context.setCurrentPokemonType} src={GetTypeImage(type.type.name)}/>
				  </span>)
			  })}
			 </div>
		</div>
		
		<div className="row">
			<div className="col-md-12 link" id={pokemon.species.name} onClick={context.setCurrentPokemon}>
			   <h3 id={pokemon.species.name}>{pokemon.species.name[0].toUpperCase()+pokemon.species.name.slice(1)}</h3>
			   <SpeciesData id={pokemon.species.name} url={pokemon.species.url}/>
			</div>
		</div>
		<div className="row">
		<div className="col-md-8 pt-3 offset-md-2">
			  <span className="link centered" id={pokemon.name} name={props.pokemon.pokemon.url} onClick={context.addToCollection}>Add to Collection</span>
			  </div>
		</div>
		</div>
		</div>
		</div>)
  }
}

const PokemonSearchResult = (props) => {
  const context = useContext(PokemonData)
  //console.log(props.pokemon)
  
  return (
		<React.Fragment>
		{props.pokemon.map((p, i) =>
			<div className="col-md-6">
				<Pokemon pokemon={p}/>
			</div>
		)}
		</React.Fragment>
  )
}

export default PokemonSearchResult