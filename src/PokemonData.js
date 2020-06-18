import React, { useContext } from 'react';
import {PokemonData} from './PokemonAppContext';

class PokemonBattleData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pokemon: this.props.pokemon,
      pokeData: []
    };
  }

  componentDidMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemon}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            pokeData: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render() {
    const { error, isLoaded, pokeData } = this.state;
    if (error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else if (!isLoaded) {
      return (
        <div>Loading...</div>
      )
    } else {
      return (
        <div>
          <div>
            <img src={pokeData.sprites.front_default} alt={`Sprite of ${pokeData.species.name}`} />
          </div>
        </div>
      )
    }
  }
}

export default PokemonBattleData