import type { Route } from '../+types/root'
import { supabase } from '~/supabase-client';
import { Form, redirect, type ActionFunctionArgs } from 'react-router';

export async function action( { request, params }: ActionFunctionArgs) {
    const formData = await request.formData()
    const title = formData.get('title')
    const description = formData.get('description') as string;
    const intent = formData.get('intent');

    if (intent === 'delete') {
        const { error } = await supabase.from('items').delete().eq('id', params.id);
        if (error) {
            return { error: 'Error deleting item' }
        }
        return redirect('/');
    } else if (intent === 'update') {
        const { error } = await supabase
        .from("items")
        .update({ title, description })
        .eq("id", params.id)
        if (error) {
            throw new Error(`Error fetching item: ${error.message}`);
        }
        return redirect('/');
    }

    return {}

  }

export async function loader({ params }: Route.LoaderArgs) {
    const { id } = params;

    if (!id) {
        throw new Error("Item ID is required");
    }

    const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(`Error fetching item: ${error.message}`);
    }

    return { item: data };
}


function Item({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) {
    const { item } = loaderData;
  return (
    <div>
        <h2>Edit Item</h2>

        <Form method="post" className="space-y-6">
            {/* Title Field */}
            <div className="flex flex-col">
            <label htmlFor="title" className="mb-2 text-sm font-medium text-stone-700">
                Title
            </label>
            <input
                id="title"
                name="title"
                defaultValue={item.title}
                type="text"
                required
                className="px-4 py-2 border bg-stone-50 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            />
            </div>

            {/* Description Field */}
            <div className="flex flex-col">
            <label htmlFor="description" className="mb-2 text-sm font-medium text-stone-700">
                Description
            </label>
            <textarea
                id="description"
                name="description"
                defaultValue={item.description}
                required
                rows={4}
                className="px-4 py-2 border bg-stone-50  border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 transition resize-none"
            />
            </div>

            {/* Submit Button */}
            <button
            type="submit"
            name="intent"
            value="update"
            className="w-full py-3 bg-violet-500 text-white font-medium rounded-lg shadow hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            >
            Update!
            </button>
            <button
            type="submit"
            name="intent"
            value="delete"
            className="w-full py-3 bg-violet-500 text-white font-medium rounded-lg shadow hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
            >
            Delete(!?)
            </button>
        </Form>
    </div>
  )
}

export default Item