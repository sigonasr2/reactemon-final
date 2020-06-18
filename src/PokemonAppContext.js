import React from 'react';

const data = {
	currentPageViewing: "GROCERYLIST",
	Pokemon: {}, //Contains page-specific data
	MyCollection: {},
	GroceryList: [],
	GroceryListItem: "",
	debug: false, //Turn off to hide navbar links used during testing.
}

/*
PAGES:
"" = HOME
"BROWSE" - Browse all pokemon.
"SIMILARTYPES" - Show similarly-typed pokemon.
"COLLECTION" - View my pokemon collection.
"BATTLE" - Battle page.
"GROCERY LIST" - Grocery List page.
*/

export const PokemonData = React.createContext(data);