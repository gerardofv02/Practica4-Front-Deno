import { FunctionComponent } from "preact";
import { PokemonsData } from "../islands/Pokemons.tsx";

type Props = {
  pokemon: PokemonsData;
};

const Pokemon: FunctionComponent<Props> = ({ pokemon }) => {
  return (
    <div class={pokemon.type}>
      <h2>{pokemon.name}</h2>
      <div>{pokemon.type}</div>
      <div>{pokemon.base_experience}</div>
    </div>
  );
};

export default Pokemon;
