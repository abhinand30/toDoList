import { configureStore } from '@reduxjs/toolkit'
import todosSlice from './toDoSlice'

const store = configureStore({
  reducer: {
    todo: todosSlice,
  },
})

export default store;