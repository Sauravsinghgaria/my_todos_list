import './App.css';
import Header from "../../my_todos_list/src/MyComponents/Header";
import {Todos} from "../../my_todos_list/src/MyComponents/Todos";
import {Footer} from "../../my_todos_list/src/MyComponents/Footer";
import {AddTodo} from "../../my_todos_list/src/MyComponents/AddTodo";
import {About} from "../../my_todos_list/src/MyComponents/About";
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  let initTodo;
    if(localStorage.getItem("todos") === null){
      initTodo=[];
    }
    else{
    initTodo = JSON.parse(localStorage.getItem("todos"))
    }
    
  const onDelete =(todo)=>{
    console.log("i m ondelete",todo);   
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const addTodo =(title, desc)=>{
    console.log("I am adding this todo",title,desc);
    let sno;
    if(todos.length === 0){
      sno = 0
    }
    else{
      sno = todos[todos.length-1].sno +1;
    }
    const myTodo={
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }, [todos])

  return (
  <>
    <Router>
    <Header title="Todo_list" />
        <Switch>
          <Route exact path="/" render={()=>{
            return(
              <>
              <AddTodo addTodo={addTodo}/>
              <Todos todos={todos} onDelete={onDelete}/>
              </>
            )
          }}>
          </Route>
          <Route exact path="/about">
            <>
            <About />
            </>
          </Route>
        </Switch>   
    <Footer/> 
    </Router>
  </>
  );
}

export default App;
