import React, { useContext } from 'react'
import {PokemonData} from '../PokemonAppContext';

const PokemonSearchResult = (props) => {
  const context = useContext(PokemonData)
  return (
    <table>
      <thead>
        <tr>
          <th>Pokemon Name</th>
          <th>Remove To Collection</th>
        </tr>
      </thead>
      <tbody>
        {context.MyCollection.map((p, i) =>
          <tr key={i}>
            <td>
              <div id={p} onClick={context.setCurrentPokemon}>{p}</div>
            </td>
            <td>
              <div id={p} onClick={context.removeFromCollection}>X</div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default PokemonSearchResult