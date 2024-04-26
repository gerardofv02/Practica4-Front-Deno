import { useEffect, useState } from "preact/hooks";
import { Props } from "./Pokemons.tsx";
import { FunctionalComponent } from "preact";
type UsersData = {
  id: number;
  name: string;
  username: string;
  created_at: string;
};

const Usuarios: FunctionalComponent<Props> = ({ miclass }) => {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<UsersData[]>([]);

  const getData = async () => {
    console.log(page);
    const url =
      `https://fernandomur-random-data-72.deno.dev/users?query=${query}&page=${page}`;
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
      <h1 class="title">Usuarios</h1>
      <input
        onInput={(e) => {
          setQuery(e.currentTarget.value);
          setPage(1);
        }}
        placeholder="Users jeje"
      >
      </input>
      {data.length > 0
        ? (
          <ul class="listado-right">
            {data.map((p) => {
              return (
                <li>
                  <h2>{p.name}</h2>
                  <div>{p.username}</div>
                  <div>{p.created_at}</div>
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

export default Usuarios;
