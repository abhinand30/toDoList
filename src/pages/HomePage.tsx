import  { useState } from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import ToDoComponent from '../components/ToDoComponent';


function HomePage() {
  const [toDo,setToDo]=useState<[]>([]);
  console.log(toDo)
  return (
    <div>
       <Header/>
       <SearchBar setToDo={setToDo}/>
       <ToDoComponent toDo={toDo}/>
    </div>
  )
}

export default HomePage