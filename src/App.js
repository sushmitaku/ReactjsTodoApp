import "./styles.css";
import React, { useState, useReducer } from "react";
import Todos from "./Todos";
export const ACTIONS = {
  ADD: "ADD",
  DELETE: "DELETE",
  TOGGLE: "TOGGLE"
};
function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.DELETE:
      return todos.filter((tod) => tod.id !== action.payload.id);
    case ACTIONS.TOGGLE:
      return todos.map((tod) => {
        if (tod.id === action.payload.id) {
          return { ...tod, complete: !tod.complete };
        }
        return tod;
      });
    case ACTIONS.UPDATE:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, name: action.payload.name };
        }
        return todo;
      });
    default:
      return todos;
  }
}
function newTodo(name) {
  return { id: Date.now(), name: name, complete: false };
}
export default function App() {
  console.log("P");
  const [name, setName] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    dispatch({ type: ACTIONS.ADD, payload: { name: name } });
    setName("");
  };
  return (
    <div className="App">
      <form onSubmit={formSubmitHandler}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        {todos?.map((val) => (
          <Todos key={val.id} todo={val} dispatch={dispatch} />
        ))}
      </form>
    </div>
  );
}
