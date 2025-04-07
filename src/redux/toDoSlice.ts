import { createSlice } from '@reduxjs/toolkit'
import { todoItem } from '../common/types'

interface cartState{
    todos:todoItem[];
  }

  const initialState:cartState={
    todos:[]
  }

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action) {
      state.push({
        id: action.payload.id,
        title: action.payload.title,
        item:action.payload.item
      })
    },
    taskCompleted(state,action){
        const todo=state.find((todo)=>todo.id===action.payload.todoId);
        const task= todo.find((item) => item.id === action.payload.itemId);
        task.completed = !task.completed
    },

  deleteTodo(state,action){
    state.todos.filter((todo)=>todo.id!==action.payload.todoItem);
  },
},
})

export const { addTodo, todoToggled } = todosSlice.actions
export default todosSlice.reducer