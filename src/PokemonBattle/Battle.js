import React, { useContext } from 'react';
import {PokemonData} from '../PokemonAppContext';

const PokemonDisplay = (props) => {
	const data = useContext(PokemonData);
	const line = props.pokemon==="1"?JSON.stringify(data.Pokemon1TypeData):JSON.stringify(data.Pokemon2TypeData);
	const numb = props.pokemon
	const myLog = props.pokemon==="1"?data.BattleLog:data.BattleLog2
	if (props.data.sprites!==undefined) {
		return (
			<div>
				<img src={props.data.sprites.front_default}/>
				<b>Types: </b>{props.data.types.map((type,ind)=>{
					if (ind>0) {
						return "/"+type.type.name;
					} else {
						return type.type.name;
					}
				})}
				<br/>
				<b>Stats: </b>{props.data.stats.map((type,ind)=>{
					return type.stat.name[0].toUpperCase()+type.stat.name.slice(1)+": "+type.base_stat+" ";
				})}
				<br/>
				<b>Type benefits: </b> {data.compareDamageOnTypes(props.pokemon)} 
				<br/>
				<b>Battle Outcome: </b> {myLog
				}				
			</div>
		)
	} else {
		return (
			<div>
				No data!
			</div>
		)
	}
}

const Pokemon = (props) => {
	const data = useContext(PokemonData);
	return (
		<input type="text" onChange={props.change}/>
	)
}

const DisplayBattle = () => {
	const data = useContext(PokemonData);
	return (
		<div>
			<PokemonDisplay data={data.Pokemon1Data} typedata={data.Pokemon1TypeData} pokemon="1"/>
			<PokemonDisplay data={data.Pokemon2Data} typedata={data.Pokemon2TypeData} pokemon="2"/>
		</div>
	);
}

const Battle = () => {
	const data = useContext(PokemonData);
	return (
		<div id="fightContainer">
			<Pokemon name="Pokemon1" change={data.setPokemon1}/>
			 VS 
			<Pokemon name="Pokemon2" change={data.setPokemon2}/>
			<button id="SEARCHING" onClick={data.doPhase}>Start Fight</button>
			<DisplayBattle/>
		</div>
	)
}

export default Battle;