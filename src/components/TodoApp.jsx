import React, { useReducer, useState } from 'react';
import { reducer } from '../store/Reducer';
import { Container, Row, Col } from 'react-bootstrap';

export const TodoApp = () => {
  const [todo, dispatch] = useReducer(reducer, []);
  const [textAdd, setTextAdd] = useState("");

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filterTodo , setFilterTodo] = useState("All")
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
    if (newText.trim() === "") return;

    dispatch({ type: "UPDATE", payload: { id, text: newText } });
    setEditId(null);
    setEditText("");
  };

  const filterTodos = todo.filter((item)=>{
    if(filterTodo === "PENDING") return !item.isComplete;
    if(filterTodo === "COMPLETE") return item.isComplete;
    return All
    
  })

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="card shadow-sm rounded">
            <div className="card-body">
              <h2 className="text-center mb-4">Todo List</h2>
              <div>
                <select 
                className='mb-3'
                value={filterTodo}
                onChange={(e)=> setFilterTodo(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="PENDING">pending</option>
                  <option value="COMPLETE">complete</option>
                </select>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-12 col-sm-8">
                  <input
                    type="text"
                    value={textAdd}
                    onChange={(e) => setTextAdd(e.target.value)}
                    placeholder="Enter todo"
                    className="form-control"
                  />
                </div>
                <div className="col-12 col-sm-4">
                  <button className="btn btn-success w-100" onClick={handleAdd}>
                    Add Todo
                  </button>
                </div>
              </div>

             
              <ul className="list-group">
                {filterTodos.map((item) => (
                  <li key={item.id} className="list-group-item">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">

                   
                      <div className="d-flex align-items-center gap-2 flex-grow-1 w-100">
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
                      <div className="row g-2 mt-2 mt-md-0 w-100">
                        <div className="col-6">
                          <button
                            className="btn btn-warning btn-sm w-100"
                            onClick={() =>
                              editId === item.id
                                ? handleUpdate(item.id, editText)
                                : (setEditId(item.id), setEditText(item.text))
                            }
                          >
                            {editId === item.id ? "Save" : "Edit"}
                          </button>
                        </div>
                        <div className="col-6">
                          <button
                            className="btn btn-danger btn-sm w-100"
                            onClick={() => handleRemove(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

