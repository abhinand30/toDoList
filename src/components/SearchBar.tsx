import { Button, ListGroup, Modal } from 'react-bootstrap'
import { useState } from 'react';

import searchIcon from '../assets/searchIcon.png'
import deleteIcon from '../assets/deleteIcon.png'

interface searchProps{
    setToDo:(value:string)=>void
}
const SearchBar:React.FC<searchProps>=(props)=> {
    const {setToDo}=props;
    const [isVisible, setIsVisible] = useState(false);
    const [title,setTitle]=useState<string>('');
    const [text,setText]=useState<string>('');
    const [tasks,setTasks]=useState<[]>([]);
    
    // const [searchText,setSearchText]=useState<string>('')

    const handleToDo = () => {
        setToDo((prevState)=>([...prevState,{id:1,title:title,item:tasks}]))
        setIsVisible(!isVisible);
       setTitle('')
       setTasks([]);
    }
    const handleTask=()=>{
        if(text){
            setTasks((prevState)=>([...prevState,{taskId:1,task:text,completed:false}]));
            setText('')
        }
       
        
    }
    return (
        <div className='searchContainer'>
            <div className='searchBar'>
                <img src={searchIcon} alt='search' className='logo' />
                <input placeholder='Search Here' className='searchInput' />
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