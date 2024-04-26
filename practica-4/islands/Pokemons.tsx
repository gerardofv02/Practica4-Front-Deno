import { useEffect, useState } from "preact/hooks";
import Pokemon from "../components/Pokemon.tsx";
import { FunctionComponent } from "preact";

export type PokemonsData = {
  id: number;
  name: string;
  type: string;
  base_experience: number;
};

export type Props = {
  miclass: string;
};

const Pokemons: FunctionComponent<Props> = ({ miclass }) => {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<PokemonsData[]>([]);

  const getData = async () => {
    console.log(page);
    const url =
      `https://fernandomur-random-data-72.deno.dev/pokemon?query=${query}&page=${page}`;
    const res = await fetch(
      url,
    );
    console.log(url);
    if (res.status !== 200) {
      throw new Response("Error ", { status: 500 });
    }

    const midata = await res.json();
    console.log(midata);

    setData(midata);
  };

  useEffect(() => {
    try {
      getData();
    } catch (e) {
      throw new Response(e, { status: 500 });
    }
  }, [page, query]);

  return (
    <div class={miclass}>
      <h1 class="title">POKEMONS</h1>
      <input
        onInput={(e) => {
          setQuery(e.currentTarget.value);
          setPage(1);
        }}
        placeholder="Charmander jeje"
      >
      </input>
      {data.length > 0
        ? (
          <ul class="listado-left">
            {data.map((p) => {
              return (
                <li>
                  <Pokemon pokemon={p} />
                </li>
              );
            })}
          </ul>
        )
        : <h1 class="no-data-found">No data found</h1>}
      <button
        class="button-left"
        onClick={() => {
          setPage(page - 1);
        }}
      >
        Anterior
      </button>
      <button
        class="button-right"
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pokemons;
