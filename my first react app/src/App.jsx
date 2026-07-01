import { useState,useEffect} from 'react'

import './App.css';

function App(){
  const [text,setText]=useState("");
  const [todos,setTodos]=useState([]); 

  useEffect(() => {
  fetch('http://localhost:3000/todos')
    .then((res) => res.json())
    .then((data) => setTodos(data));
}, []);

 function handleSubmit(e) {
  e.preventDefault();
  if (text.trim() === "") return;

  fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text })
  })
    .then((res) => res.json())
    .then((newTodo) => {
      setTodos([...todos, newTodo]);
      setText("");
    });
}

function deleteTodo(id) {
  fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE'
  })
    .then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
}

function toggleTodo(id) {
  const todo = todos.find((t) => t._id === id);
  fetch(`http://localhost:3000/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !todo.completed })
  })
    .then((res) => res.json())
    .then((updatedTodo) => {
      setTodos(todos.map((t) => t._id === id ? updatedTodo : t));
    });
}


  const doneCount = todos.filter((todo) => todo.completed).length;
  return(

    <div className="terminal">
      <h1>MY TO DO LIST</h1>

     <p className='subtitle'>{todos.length} tasks, {doneCount} done</p>

     <form onSubmit={handleSubmit}>
      <input type="text" placeholder="add a task" className="task-input" 
      value={text} onChange={(e)=>setText(e.target.value)}/>

     <button type='submit' className='add-btn'>add</button>



      </form>

      
<ul>
  {todos.map((todo)=>(
    <li key={todo._id} className='task-text'>
  <input
    type="checkbox"
    checked={todo.completed}
    onChange={() => toggleTodo(todo._id)}
  />
  <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
    {todo.text}
  </span>
  <span onClick={()=>deleteTodo(todo._id)} className='delete-btn'>X</span>
</li>
  ))}
</ul>

    </div>
  );
}
export default App;