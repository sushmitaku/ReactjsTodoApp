import React, { useState } from "react";
import { ACTIONS } from "./App";

const Todos = (props) => {
  const [editMode, setEditMode] = useState(false);
  // const [editedName, setEditedName] = useState("");
  // both ways correct
  const [editedName, setEditedName] = useState("");
  console.log("hi", editedName);
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleSave = () => {
    if (editedName.trim() !== "") {
      console.log("yes");
      props.dispatch({
        type: ACTIONS.UPDATE,
        payload: { id: props.todo.id, name: editedName }
      });
    }
    setEditMode(false);
  };

  return (
    <div>
      {editMode ? (
        <input
          type="text"
          value={editedName}
          onChange={handleNameChange}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <span
          className="editable-todo"
          style={{
            color: props.todo.complete ? "red" : "green",
            cursor: "pointer"
          }}
          onClick={toggleEditMode}
        >
          {props.todo.name}
          <span className="edit-indicator" role="img" aria-label="Edit">
          ✏️
          </span>
        </span>
      )}
      <button
        type="button"
        onClick={() => {
          props.dispatch({
            type: ACTIONS.DELETE,
            payload: { id: props.todo.id }
          });
        }}
      >
        DELETE
      </button>
      <button
        type="button"
        onClick={() => {
          props.dispatch({
            type: ACTIONS.TOGGLE,
            payload: { id: props.todo.id }
          });
        }}
      >
        TOGGLE
      </button>
    </div>
  );
};

export default Todos;
