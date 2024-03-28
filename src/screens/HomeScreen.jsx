import React, { useState, useEffect, useContext } from 'react';
import { PokemonContext } from './PokemonContext';

function PokemonDetailsPage() {
  const [pokemon, setPokemon] = useState(null);
  const { name } = useParams();
  const { state, capture } = useContext(PokemonContext);

  useEffect(() => {
    async function fetchPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemon(data);
    }

    fetchPokemon();
  }, [name]);

  if (!pokemon) {
    return <div> Loading... </div>;
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <button onClick={() => {
        capture(pokemon.name);
        window.history.back();
      }}>
        Catch
      </button>
    </div>
  );
}

export default PokemonDetailsPage;