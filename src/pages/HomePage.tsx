import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import ToDoComponent from '../components/ToDoComponent';
import { todoSelected } from '../redux/toDoSlice';



function HomePage() {
  const todos=useSelector(todoSelected);

  const [searchText,setSearchText]=useState<string>('');
  const [todoArray,setTodoArray]=useState<[]>(todos)

  useEffect(() => {
    const handleSearch=()=>{
     
        const todoSearchArray=todos.filter((todo)=>(todo.title.includes(searchText)))
        setTodoArray(todoSearchArray)
        console.log('>>>>')
        console.log(todoSearchArray)
    }
    
    handleSearch();
  }, [searchText,todos])
  
  return (
    <div>
       <Header/>
       <SearchBar setSearchText={setSearchText}/>
       <ToDoComponent todoArray={todoArray}/>
    </div>
  )
}

export default HomePage