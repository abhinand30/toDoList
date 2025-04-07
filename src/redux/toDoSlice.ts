import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todoItem } from '../common/types'

interface cartState{
    todos:todoItem[];
  }

  const initialState:cartState={
    todos:[]
  }

const todosSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
   
    addTodo:(state, action:PayloadAction<todoItem>)=> {
      state.todos.push({
        id: action.payload.id,
        title: action.payload.title,
        item:action.payload.item
      })
    },
    taskCompleted(state,action){
        const todo=state.todos.find((todo)=>todo.id===action.payload.todoId);
        if(todo){
          const task= todo.item.find((item) => item.taskId === action.payload.itemId);
          if(task){
            task.completed = !task.completed
          }
          
        } 
       
    },

  deleteTodo:(state,action:PayloadAction<number>)=>{
    state.todos.filter((todo)=>todo.id!==action.payload);
  },
},
})

export const { addTodo, taskCompleted,deleteTodo } = todosSlice.actions;
export const todoSelected = (state: {todo:cartState})=>state.todo.todos ;
export default todosSlice.reducer;