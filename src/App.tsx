import HomePage from './pages/HomePage';
import './index.css'
import { Route, Routes } from 'react-router-dom';
import AddTodoPage from './pages/AddTodoPage';
function App() {


  return (
    <>
    <Routes>
         <Route path='/' element={<HomePage/>} />
         <Route path='/add-todo' element={<AddTodoPage/>} />
       </Routes>
    </>
  )
}

export default App
