import { Button, Image, ListGroup, Modal } from 'react-bootstrap'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import searchIcon from '../assets/searchIcon.png'
import deleteIcon from '../assets/deleteIcon1.png'
import { addTodo, todoSelected } from '../redux/toDoSlice';
import { searchProps } from '../common/types';
import { addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const SearchBar:React.FC<searchProps>=(props)=> {
    const {setSearchText,searchText}=props;
    const dispatch=useDispatch();
    const todos=useSelector(todoSelected);

    const [isVisible, setIsVisible] = useState(false);
    const [title,setTitle]=useState<string>('');
    const [text,setText]=useState<string>('');
    const [tasks,setTasks]=useState<[]>([]);
    

    const handleToDo = async() => {
        // if(title){
        //     dispatch(addTodo({id:todos.length+1,title:title,item:tasks}))
        //     setIsVisible(!isVisible);
        //     setTitle('');
        //     setTasks([]);
        //     setText('');
        // }
        try{
             await addDoc(doc(db, "cities", "new-city-id"), data);
        }
        catch(error){
            console.log(error)
        }
        
       
    }

    const handleTask=()=>{
        if(text){
            setTasks((prevState)=>([...prevState,{taskId:tasks.length+1,task:text,completed:false}]));
            setText('')
        }  
    }

    
    const deleteTask=(id:number)=>{
        const updatedTask=tasks.filter((task)=>task.taskId!==id)
        setTasks(updatedTask)
        
    }
    
    return (
        <div className='searchContainer'>
            <div className='searchBar'>
                <Image src={searchIcon} alt='search' className='logo' style={{}}/>
                <input placeholder='Search Here' className='searchInput' value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
            </div>
            <div>
                <Button className='buttonContainer' onClick={() => setIsVisible(!isVisible)}>+ Add New Task</Button>
                {/* <button className='buttonContainer'><img src={deleteIcon}></img></button> */}
            </div>

            <Modal show={isVisible} onHide={()=>setIsVisible(!isVisible)}>
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
                    <ListGroup className='mt-10' style={{}}>
                        {tasks.map((task,index)=>(
                            <ListGroup.Item key={index} className='listComponent'>
                                <div>
                                {task.task}
                                </div>
                                <button className='deleteButton' onClick={()=>deleteTask(task.taskId)}>
                                    <Image src={deleteIcon} alt='icon' className='logo'/>
                                </button>
                            </ListGroup.Item>
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