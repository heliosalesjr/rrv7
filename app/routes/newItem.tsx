
import { Form, redirect, type ActionFunctionArgs } from 'react-router'
import { supabase } from '~/supabase-client';

export function meta() {
  return [
    { title: 'New Item | Theme' },
    { description: 'Adding content!' },
  ]
}



export async function action( { request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const title = formData.get('title')
  const description = formData.get('description') as string;

  if (!title || !description) {
    return { error: 'Title and description are required' }
  }

  const { error } = await supabase.from('items').insert({ title, description });
  if (error) {
    return { error: 'Error creating item' }
  }

  return redirect('/');
}

const newItem = () => {
  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-yellow-50 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-slate-800 mb-6">
        New Items Page
      </h2>
      <Form method="post" className="space-y-6">
        {/* Title Field */}
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2 text-sm font-medium text-stone-700">
            Title
          </label>
          <input
            id="title"
            name="title"
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
            required
            rows={4}
            className="px-4 py-2 border bg-stone-50  border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 transition resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-violet-500 text-white font-medium rounded-lg shadow hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
        >
          Create!
        </button>
      </Form>
    </div>
  )
}

export default newItem