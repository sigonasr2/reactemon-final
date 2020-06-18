import React, { useState } from 'react';
import PokemonSearch from './PokemonSearch.js'

const PokemonSearchPage = (props) => {
  // Search bar state
  const [searchError, setSearchError] = useState(true);
  const [search, setSearch] = useState('')

  const handleChange = (event) => {
    setSearch(event.target.value)
    setSearchError(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search.indexOf('=') === -1) {
      setSearchError(true)
    } else {
      setSearchError(false)
    }
  }

  const renderForm = () => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Search by properties: (e.g. type=ground, ability=battle-armor)
            </label>
          <div>
            <input
              type="text"
              name="name"
              value={search}
              onChange={handleChange}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div >
    )
  }

  if (searchError !== true && search) {
    return (
      <div>
        {renderForm()}
        <PokemonSearch search={search} />
      </div>
    )
  } else {
    return (
      <div>
        {renderForm()}
      </div>
    )
  }
}

export default PokemonSearchPage