import { Button, Card, Dropdown, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { todoItem, todoProps } from "../common/types";
import { deleteTodo, taskCompleted } from "../redux/toDoSlice";
import menuIcon from '../assets/menuIcon.png'

const ToDoComponent: React.FC<todoProps> = (props) => {
  const { todoArray } = props;
  const dispatch = useDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const [todo, setTodo] = useState<todoItem | null>(null);
  
  const handleTodo = (item: todoItem) => {
    setTodo(item);
    setModal(true);
  };
  

  const handleTask = (taskId:number) => {
    if(todo){
      dispatch(taskCompleted({todoId: todo.id, itemId:taskId }))
    }
  }
  
  const handleDelete=(todoItem:number)=>{
    console.log(todoItem,'jjjj')
      dispatch(deleteTodo(todoItem))
  }
  
  return (
    <div>
      <div style={{ display: "flex",margin:'10px'  }}>
      {todoArray.map((item, index) => (
        <Card key={index} style={{ width: "18rem",borderColor:'10px',margin:'10px' }}>
           <Card.Title style={{fontSize:'25px',fontWeight:'bold'}}>{item.title}
           <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor:'#fff',borderWidth:0}}>
        <img src={menuIcon}/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleTodo(item)}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={()=>handleDelete(item.id)}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </Card.Title>  
          <Card.Body>
           
            <Card.Text>
              {item.item.map((task, taskIndex) => (
                <li key={taskIndex}>{task.task}</li>
              ))}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      </div>
     

      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{todo?.title || "No Title"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {todo?.item?.filter((task)=>!task.completed).map((task, index) => (
            <div key={index} className="rowContainer">
              <Form.Check
                type="checkbox"
                id={`${task.taskId}`}
                label={` ${task.task}`}
                checked={task.completed}
                onChange={() => handleTask(task.taskId)}
              />
            </div>
          ))}
          <hr />
          {todo?.item?.filter((task)=>task.completed).map((task, index) => (
            <div key={index} className="rowContainer">
              <Form.Check
                type="checkbox"
                id={`${task.taskId}`}
                label={` ${task.task}`}
                checked={task.completed}
                style={{textDecoration:'strike-through',color:'red'}}
                onChange={() => handleTask(task.taskId)}
              />
            </div>
          ))}
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ToDoComponent;
