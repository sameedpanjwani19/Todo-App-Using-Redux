import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, editTodo } from '../config/reducers/todoSlice';

const App = () => {
  const todoVal = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const dispatch = useDispatch();

  const selector = useSelector((state) => state.todos.todo);

  const todoSubmit = (event) => {
    event.preventDefault();
    const todoText = todoVal.current.value.trim();

    if (todoText !== "") {
      if (isEditing) {
        dispatch(editTodo({
          index: currentIndex,
          title: todoText
        }));
        setIsEditing(false);
        setCurrentIndex(null);
      } else {
        dispatch(addTodo({
          title: todoText
        }));
      }
      todoVal.current.value = "";
    }
  };

  const deleteItemRedux = (index) => {
    dispatch(removeTodo({ index }));
  };

  const editItemRedux = (index, title) => {
    todoVal.current.value = title;
    setIsEditing(true);
    setCurrentIndex(index);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={todoSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            ref={todoVal}
            className="form-control"
            placeholder={isEditing ? "Edit Todo" : "Add Todo"}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Update Todo" : "Add Todo"}
            </button>
          </div>
        </div>
      </form>

      <ul className="list-group">
        {selector.length > 0 ? (
          selector.map((item, index) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              {item.title}
              <div className="w-25 d-flex justify-content-around ">
                <button onClick={() => editItemRedux(index, item.title)} className="btn btn-warning btn-sm mr-5 ">
                  Edit
                </button>
                <button onClick={() => deleteItemRedux(index)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <h1>No data found</h1>
        )}
      </ul>
    </div>
  );
};

export default App;
