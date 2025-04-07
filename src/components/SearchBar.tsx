import { Button, ListGroup, Modal } from 'react-bootstrap'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import searchIcon from '../assets/searchIcon.png'
import deleteIcon from '../assets/deleteIcon.png'
import { addTodo, todoSelected } from '../redux/toDoSlice';
import { searchProps } from '../common/types';

const SearchBar:React.FC<searchProps>=(props)=> {
    const {setSearchText,searchText}=props;
    const dispatch=useDispatch();
    const todos=useSelector(todoSelected);

    const [isVisible, setIsVisible] = useState(false);
    const [title,setTitle]=useState<string>('');
    const [text,setText]=useState<string>('');
    const [tasks,setTasks]=useState<[]>([]);
    

    const handleToDo = () => {
        dispatch(addTodo({id:todos.length+1,title:title,item:tasks}))
        setIsVisible(!isVisible);
       setTitle('')
       setTasks([]);
    }

    const handleTask=()=>{
        if(text){
            setTasks((prevState)=>([...prevState,{taskId:tasks.length+1,task:text,completed:false}]));
            setText('')
        }  
    }

    
    
    
    return (
        <div className='searchContainer'>
            <div className='searchBar'>
                <img src={searchIcon} alt='search' className='logo' />
                <input placeholder='Search Here' className='searchInput' value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
            </div>
            <div>
                <button className='buttonContainer' onClick={() => setIsVisible(!isVisible)}>+ Add New Task</button>
                <button className='buttonContainer'><img src={deleteIcon}></img></button>
            </div>

            <Modal show={isVisible} onHide={handleToDo}>
                <Modal.Header closeButton>
                    <Modal.Title>Add ToDo</Modal.Title>
                </Modal.Header>
             <Modal.Body>
                <input className='inputText' placeholder='Enter Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <div className='rowContainer'>
                    <input className='inputText' placeholder='Enter task' value={text} onChange={(e)=>setText(e.target.value)}/>
                    <Button onClick={handleTask}>+</Button>
                </div>
                {tasks&&(
                    <ListGroup className='mt-10'>
                        {tasks.map((task,index)=>(
                            <ListGroup.Item key={index}>{task.task}</ListGroup.Item>
                        ))}
                        
                    </ListGroup>
                )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setIsVisible(!isVisible)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleToDo}>
                        Add ToDo
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default SearchBar