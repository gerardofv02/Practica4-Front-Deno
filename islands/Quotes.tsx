import { useEffect, useState } from "preact/hooks";
import { Props } from "./Pokemons.tsx";
import { FunctionalComponent } from "preact";
import { FunctionComponent } from "preact";

type QuotesData = {
  id: number;
  quote: string;
};

const Quotes: FunctionComponent<Props> = ({ miclass }) => {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<QuotesData[]>([]);

  const getData = async () => {
    console.log(page);
    const url =
      `https://fernandomur-random-data-72.deno.dev/quotes?query=${query}&page=${page}`;
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
      <h1 class="title">Quotes</h1>
      <input
        onInput={(e) => {
          setQuery(e.currentTarget.value);
          setPage(1);
        }}
        placeholder="Quote jeje"
      >
      </input>
      {data.length > 0
        ? (
          <ul class="listado-right">
            {data.map((p) => {
              return (
                <li>
                  <h2>{p.id}</h2>
                  <div>{p.quote}</div>
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

export default Quotes;
