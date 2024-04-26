import Pokemons from "../islands/Pokemons.tsx";
import Quotes from "../islands/Quotes.tsx";
import Usuarios from "../islands/Usuarios.tsx";

export default function Home() {
  return (
    <div id="container">
      <Pokemons miclass="Left"></Pokemons>
      <div class="right">
        <Quotes miclass="Right-Up"></Quotes>
        <Usuarios miclass="Right-Down"></Usuarios>
      </div>
    </div>
  );
}
