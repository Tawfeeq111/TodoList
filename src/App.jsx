import React from "react";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./index.css";

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  const saveToLocalStorage = () => {
    localStorage.setItem("todoL", JSON.stringify(todos));
  }

  useEffect(() => {
    let items = localStorage.getItem("todoL")
    if (items) {
      let tod = JSON.parse(localStorage.getItem("todoL"));
      setTodos(tod);
    }
    setTodo("");
  }, [])

  const handelAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocalStorage();
  }

  const handelEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLocalStorage();
  }

  const handelDelete = (e) => {
    let idx = e.target.name;
    let newTodos = todos.filter((ele) => {
      return ele.id != idx;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  }

  const handelChange = (e) => {
    setTodo(e.target.value);
  }

  const handelCheckbox = (e) => {
    let idx = e.target.name;
    let i = todos.findIndex((ele) => {
      return ele.id === idx
    })
    let newTodos = [...todos];
    newTodos[i].isCompleted = !newTodos[i].isCompleted
    setTodos(newTodos)
    saveToLocalStorage();
  }

  const handelShowCompletedTodos = () => {
    setShowCompleted(!showCompleted);
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-9">
        <div className="bg-violet-100 p-5 rounded-xl m-auto min-h-[70vh] w-2/3">
       <h2 className="text-xl font-bold text-center my-4">TodoList - Manage your tasks at one place</h2>
          <div className="todo my-4">
            <h2 className="text-xl font-bold">Add a Todo</h2>
            <div className="flex flex-col">
              <input type="text" onChange={handelChange} value={todo} className='w-full h-7 rounded-sm my-2 p-2' />
              <button onClick={handelAdd} disabled={todo.length < 3} className="btn bg-violet-600 p-2 py-1 text-white font-bold text-sm rounded-md hover:bg-violet-600 w-full disabled:bg-violet-800">Save</button>
            </div>
          </div>
          <div className="flex gap-2 my-3">
            <input type="checkbox" checked={showCompleted} onChange={handelShowCompletedTodos} /><h2 className="">Show Completed</h2>
          </div>
          <h2 className="text-xl font-bold">Your Todo's</h2>
          <div>
            {todos.length == 0 ? <div className="text-ls font-bold my-4 ">No Todods to display</div> :
              todos.map((ele, idx) => {
                return (showCompleted || ele.isCompleted == false) && <div key={ele.id} className="todos flex justify-between my-3">
                  <div className="flex gap-6 conatiner">
                    <input type="checkbox" onChange={handelCheckbox} name={ele.id} checked={ele.isCompleted} />
                    <div className={ele.isCompleted ? "line-through" : ""}>{ele.todo}</div>
                  </div>
                  <div className="btns flex gap-4 mx-4">
                    <button onClick={(e)=>handelEdit(e, ele.id)} name={ele.id} className="btn bg-violet-700 p-2 py-1 text-white font-bold text-sm rounded-md hover:bg-violet-900"><FaEdit /></button>
                    <button onClick={handelDelete} name={ele.id} className="btn bg-violet-700 p-2 py-1 text-white font-bold text-sm rounded-md hover:bg-violet-900"><MdDelete /></button>
                  </div>
                </div>
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
