import axios from 'axios';
import React, { useEffect, useState } from 'react'
const App = () => {
  const [input , setInput] = useState('')
  const [todo , setTodo] = useState(null)
  const [alert, setAlert] = useState('');

  useEffect(()=>{
    async function getData(){
      const response = await axios('http://localhost:3000/todo')
      console.log(response.data)
      setTodo(response.data.todos)
      
    }
    getData()
  } , [])
  const addTodo = async (event)=>{
    event.preventDefault();
    console.log(input);
    const response = await axios.post('http://localhost:3000/todo' , {
      title: input
    })
 
    console.log(response)
    setTodo([...todo , response.data.todo])
    setInput('')
    setAlert({ type: 'success', message: 'Todo added successfully!' });

    setTimeout(() => setAlert(''), 3000); // Close alert after 3 seconds
  }
  const editTodo = async (id,index)=>{
    const updated = prompt('enter updated val')
    const response = await axios.put(`http://localhost:3000/todo/${id}` , {
      title: updated
    })
    todo[index].title = updated
    setTodo([...todo])
    console.log(response)
    setAlert({ type: 'success', message: 'Todo updated successfully!' });
    setTimeout(() => setAlert(''), 3000);
  }

  const deleteTodo = async (id,index)=>{
    const response = await axios.delete(`http://localhost:3000/todo/${id}`)
    todo.splice(index , 1)
    setTodo([...todo])
    setAlert({ type: 'success', message: 'Todo deleted successfully!' });
      setTimeout(() => setAlert(''), 3000);
  }
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
    <h1 className='text-4xl font-bold mb-6 text-blue-600'>Todo App</h1>
    {alert && (
        <div
          className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'} mb-4 w-auto`}
        >
          <span>{alert.message}</span>
        </div>
      )}
    <form onSubmit={addTodo} className="flex gap-4 mb-6">
      <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder='enter your todo' className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-80" />
      <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >Add Todo</button>
    </form>
    <ul className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
      {todo ? todo.map((item ,index) => {
        return <li
              key={item.id}
              className="flex justify-between items-center border-b last:border-b-0 py-3"
            >
              <span className="text-gray-700">{item.title}</span>
              <div className="flex gap-2">
        <button onClick={()=> editTodo(item.id,index)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-all">Edit</button>
        <button onClick={()=> deleteTodo(item.id,index)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all">Delete</button>
        </div>
        </li>
      }): <h1>Loading...</h1>}
    </ul>
    </div>
    </>
  )
}
export default App