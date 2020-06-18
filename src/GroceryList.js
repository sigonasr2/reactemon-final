import React, { useContext } from 'react';
import {PokemonData} from './PokemonAppContext';

const RemoveButton = (props) => {
	const data = useContext(PokemonData);
	return (
		<button id={props.element} onClick={data.removeFromGroceryList}>
		-
		</button>
	)
}

const ItemList = () => {
	const data = useContext(PokemonData);
	return (
		<div>
			<ul>
				{data.GroceryList.map((item,id)=>(
				<li>{item.name+" x"+item.quantity} <RemoveButton element={id}/></li>))
				}
			</ul>
		</div>
	)
}

const AddItem = () => {
	const data = useContext(PokemonData);
	return (
		<div>
			<label for="item"><b>Add Item:</b></label>
			<input type="text" id="item" onChange={data.updateAddedItem}/>
			<label for="quantity"><b>Quantity:</b></label>
			<input className="smallForm" type="number"min="1" max="99" id="quantity" onChange={data.updateQuantityItem}/>
			<button onClick={data.addToGroceryList}>Submit</button>
		</div>
	)
}

const GroceryList = () => {
	const data = useContext(PokemonData);
	return (
		<div>
			<ItemList/>
			<AddItem/>
		</div>
	)
}

export default GroceryList;