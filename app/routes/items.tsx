import { supabase } from "~/supabase-client";
import type { Route } from "../+types/root";
import { Link, Form } from "react-router";

export async function loader() {
  const { data, error } = await supabase.from("items").select("*");
  if (error) {
    return { error: error.message };
  }

  return { items: data };
}

export default function Items({
  loaderData,
}: {
  loaderData: Awaited<ReturnType<typeof loader>>;
}) {
  const { error, items } = loaderData;
  return (
    <div>
      <h2 className="text-2xl py-2 font-semibold text-stone-500">
        List of items
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {items?.map((item) => (
          <li
            key={item.id}
            className="p-4 bg-white shadow-md rounded-lg space-y-2"
          >
            <Link to={`/items/${item.id}`} className="block text-stone-600">
              <span className="font-bold text-xl">{item.title}</span>
              <p className="text-stone-700">{item.description}</p>
            </Link>

            <div className="flex gap-2 pt-2">
              {/* Botão de editar */}
              <Link
                to={`/items/${item.id}`}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                Editar
              </Link>

              {/* Botão de deletar */}
              <Form
                method="post"
                action={`/items/${item.id}`}
                onSubmit={(e) => {
                  if (!confirm("Tem certeza que deseja deletar este item?")) {
                    e.preventDefault();
                  }
                }}
              >
                <button
                  type="submit"
                  name="intent"
                  value="delete"
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Deletar
                </button>
              </Form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
