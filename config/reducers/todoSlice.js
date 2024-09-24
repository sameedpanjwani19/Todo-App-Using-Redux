import { createSlice, nanoid } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
    try {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (e) {
      console.error("Failed to load todos from local storage", e);
      return [];
    }
  };
  
  

  const saveToLocalStorage = (todos) => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (e) {
      console.error("Failed to save todos to local storage", e);
    }
  };

export const todoSlice = createSlice({
    name: "Todos",
    initialState: {todo: []},
    todo: loadFromLocalStorage(),
    reducers: {
        addTodo: (state, action) => {
            state.todo.push({
                id: nanoid(),
                title: action.payload.title
            })
            saveToLocalStorage(state.todo);
        },
        removeTodo: (state , action) =>{
            state.todo.splice(action.payload.index , 1)
            saveToLocalStorage(state.todo);
        },
        editTodo: (state, action) => {
            const { index, title } = action.payload;
            state.todo[index].title = title; 
            saveToLocalStorage(state.todo); 
          }
    }
})

export const { addTodo , removeTodo,editTodo } = todoSlice.actions
export default todoSlice.reducer