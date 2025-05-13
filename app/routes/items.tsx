import { supabase } from "~/supabase-client";
import type { Route } from "../+types/root";
import { Link } from "react-router";


export async function loader() {
  const{data, error} = await supabase.from("items").select("*");
  if (error) {
    return { error: error.message };
  }

  return { items: data }
}

export default function Items( { loaderData }: Route.ComponentProps) {
  const { error, items } = loaderData;
  return (
  <div>
    <h2 className="text-2xl py-2 font-semibold text-stone-500">List of items</h2>
    {error && <p className="text-red-500">{error}</p>}
    <ul className="space-y-4">
      {items?.map((item) => (
        <li className="p-4 bg-white shadow-md rounded-lg">
          <Link to={"/"} className="block text-stone-600">
            <span className="font-bold text-xl"> {item.title}</span>
            <p className="text-stone-700"> {item.description}</p>
          </Link>
        </li>
        
      ))}
    </ul>
  </div>
 )
  
}