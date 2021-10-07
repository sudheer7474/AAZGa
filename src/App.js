import React, {useState} from "react";
import './App.css'


const initialTodos = [	
  { 
    itemId: 1,
    displayText: 'laundry'
  },
  { 
  itemId: 2,
    displayText: 'grocery shopping'
  },
  { 
  itemId: 3,
    displayText: 'take a dentist appointment'
  },
  
  ]
  
export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [inputText, setInput] = useState('');
  const [str, setStr] = useState('');
  const [output, setOutput] = useState('');
  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const addtodo = () => {
    const lastTodo  = todos[todos.length-1];
    const nxtIndex = lastTodo ? lastTodo.itemId+1 : 0;
    setTodos([
      ...todos,
       { itemId: nxtIndex, displayText: inputText}
      ])
    setInput('');
  }

  const handleStrike = (e,id) => {
    const index = todos.findIndex((todo)=>todo.itemId == id);
    todos[index].isCompleted = e.target.checked;
   setTodos([...todos])
  }

  const handleDelete = (id) => {
    const index = todos.findIndex((todo)=>todo.itemId == id);
    const updatedTodos = [...todos.slice(0,index), ...todos.slice(index+1)];
    setTodos([...updatedTodos]);
  }

  const handleTextEnter = (e) => {
        setStr(e.target.value)
    }

    const handleOutPut = () => {
      var obj = {};
    var newStr = '';
    var previousStr = '';
    var arr = [...str];
       
        for(var currentStr of arr){
            if(!obj[currentStr]){
                obj[currentStr] = 1;
            }else{
                obj[currentStr] = obj[currentStr] + 1;
            }
        }
    
        for(currentStr of arr){
                console.log({obj,  previousStr,  currentStr});
                if((obj[currentStr] >  2 || obj[currentStr] == 1 )&& previousStr !=currentStr){
                    newStr+=currentStr;
                    previousStr = currentStr;
    
                }
            }
        setOutput(newStr);    
    }

  console.log(todos)
  const pendingTodos = todos.filter(todo=>!todo.isCompleted)
  return (
    <div>
      <center>
     <input type="text" placeholder="add todo" onChange={handleChange} value={inputText} size="50" height="50"/>
     <button type="button" onClick={addtodo}>Add Todo</button>
     <div>
       <ul>
      { todos.map(todo=>{
         return (
           <div className="container">
           <div className="list-item">
           <input 
           type="checkbox"
            onChange={(e)=>handleStrike(e, todo.itemId)}
           
            />
         <li 
         className={todo.isCompleted ? 'strike': ''}
          key={todo.displayText}
          >
           {todo.displayText}
           </li>
           </div>
           {todo.isCompleted ? <button type="button" onClick={()=>handleDelete(todo.itemId)}>delete</button> : ''}
        
         </div>
         
         )
       })}
       </ul>
     </div>
     <h4>Pending Todos: {pendingTodos.length}</h4>
     
     <hr/>
     <h2>Remove Subsequent pairs:</h2>
  <input type="text" onChange={handleTextEnter}/>
  <button type="button" onClick={handleOutPut}>output</button>
  <p>Output: {output}</p>
  </center>
    </div>
  );
}
