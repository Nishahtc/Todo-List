
import React, { useReducer, useState } from 'react';
import { reducer } from '../store/Reducer';

export const TodoApp = () => {
  const [todo, dispatch] = useReducer(reducer, []);
  const [textAdd, setTextAdd] = useState("");

  const [editId, setEditId] = useState(null);     
  const [editText, setEditText] = useState("");  

  const handleAdd = () => {
    if (textAdd.trim()) {
      dispatch({ type: "ADD_TODO", payload: { text: textAdd } });
      setTextAdd("");
    }
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE", payload: { id } });
  };

  const handleToggle = (id) => {
    dispatch({ type: "TOGGLE", payload: { id } });
  };

  const handleUpdate = (id, newText) => {
    if (newText.trim === "") return;

      dispatch({ type: "UPDATE", payload: { id, text: newText } });
      setEditId(null);
      setEditText("");
    
  };

  return (
    <div className="card w-50 mx-auto mt-4">
      <div className="card-body">
        <h2 className='mb-3'>Todo List</h2>

       
        <div className="d-flex gap-2 mb-3">
          <input
            type="text"
            value={textAdd}
            onChange={(e) => setTextAdd(e.target.value)}
            placeholder="Enter todo"
            className="form-control"
          />
          <button className="btn btn-success" onClick={handleAdd}>
            AddTodo
          </button>
        </div>

      
        <ul className="list-group">
          {todo.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2 w-75">
             
                <input
                  type="checkbox"
                  checked={item.isComplete}
                  onChange={() => handleToggle(item.id)}
                />

               
                <input
                  type="text"
                  value={editId === item.id ? editText : item.text}
                  onChange={(e) => setEditText(e.target.value)}
                  disabled={editId !== item.id}
                  className={`form-control ${item.isComplete ? 'text-decoration-line-through text-muted' : ''}`}
                />
              </div>

              <div className="d-flex gap-2">
               
             <button 
              className='btn btn-warning btn-sm'
             onClick={()=> editId === item.id
                ? handleUpdate(item.id , editText)
                : (setEditId(item.id),setEditText(item.text))
              }
              >
                {editId === item.id ? "Save" : "Edit"}

             </button>

                
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};