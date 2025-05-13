
import { Form, redirect, type ActionFunctionArgs } from 'react-router'
import { supabase } from '~/supabase-client';

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
    <div>
      <h2>New Items Page</h2>
      <Form method='post'>
        <div>
          <label>Title</label>
          <input type='text' name='title' required></input>
        </div>

        <div>
          <label>Desciption</label>
          <textarea name='description' required></textarea>
        </div>

        <button type='submit'>Create!</button>
      </Form>
    </div>
  )
}

export default newItem