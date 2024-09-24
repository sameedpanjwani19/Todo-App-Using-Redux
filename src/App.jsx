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
    todoVal.current.value = title;  // Populate input field with current value
    setIsEditing(true);  // Set edit mode to true
    setCurrentIndex(index);  // Set the index of the todo being edited
  };

  return (
    <>
      <form onSubmit={todoSubmit}>
        <input type="text" ref={todoVal} placeholder={isEditing ? "Edit Todo" : "Add Todo"} />
        <button type="submit">{isEditing ? "Update Todo" : "Add Todo"}</button>
      </form>
      <ul>
        {selector.length > 0 ? (
          selector.map((item, index) => (
            <li key={item.id}>
              {item.title}
              <button onClick={() => editItemRedux(index, item.title)}>Edit</button>
              <button onClick={() => deleteItemRedux(index)}>Delete</button>
            </li>
          ))
        ) : (
          <h1>No data found</h1>
        )}
      </ul>
    </>
  );
};

export default App;
