import { useState} from 'react'
import './App.css';

function App(){
  const [text,setText]=useState("");
  const [todos,setTodos]=useState([]); 

  function handleSubmit(e){
    e.preventDefault();
    if(text.trim()=="") return;

    const newTodo={
      id:Date.now(),
      text:text,                  //not =
      completed:false,
    };

    setTodos([...todos,newTodo]);
    setText("");
  }


  function deleteTodo(id){
    setTodos(todos.filter((todo)=>todo.id!==id));
    //.filter() keeps every todo except the one whose id matches what you clicked delete on — it builds a new array without that item. This is the same "never mutate, create new" rule from before.
  }

  function toggleTodo(id){
    setTodos(
      todos.map((todo)=>todo.id===id?{...todo,completed:!todo.completed}:todo)
    );
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
    <li key={todo.id} className='task-text'>
  <input
    type="checkbox"
    checked={todo.completed}
    onChange={() => toggleTodo(todo.id)}
  />
  <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
    {todo.text}
  </span>
  <span onClick={()=>deleteTodo(todo.id)} className='delete-btn'>X</span>
</li>
  ))}
</ul>

    </div>
  );
}
export default App;