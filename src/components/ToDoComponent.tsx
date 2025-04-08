import {  Button, Card, Image,Modal,Row } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { todoItem, todoProps } from "../common/types";
import { deleteTask, deleteTodo, taskCompleted } from "../redux/toDoSlice";
import editIcon from '../assets/editIcon.png'
import deleteIcon from "../assets/deleteIcon.png"
import ModalComponent from "./ModalComponent";

const ToDoComponent: React.FC<todoProps> = (props) => {
  const { todoArray } = props;
  const dispatch = useDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const [todo, setTodo] = useState<todoItem | null>(null);
  const [deleteAlert,setDeleteAlert]=useState<boolean>(false);

  const handleTodo = (item: todoItem) => {
    setTodo(item);
    setModal(true);
  };


  const handleTask = (taskId: number) => {
    if (todo) {
      dispatch(taskCompleted({ todoId: todo.id, itemId: taskId }));
      setTodo({
        ...todo,
        item: todo.item.map((task) =>
          task.taskId === taskId
            ? { ...task, completed: !task.completed }
            : task
        ),
      });
    }
  };

  const handleDelete = (todoItem: number) => {
    dispatch(deleteTodo(todoItem));
    
  };

  const onDeleteTask = (taskId: number) => {
        
    if (taskId) {
        dispatch(deleteTask({ todoId: todo?.id, taskId: taskId }));
        if(todo){
          setTodo({
            ...todo,
            item: todo.item.filter((task) =>
              task.taskId !== taskId
            ),
          });
        }
       
    }
}

  return (
    <div className="" style={{padding:'20px'}}>
      <div className="todoTitle">
        All Todos
      </div>
      <Row>
        {todoArray.map((item, index) => (
          <Card
            key={index}
            className="cardContianer"
          >
           
            <Card.Body>
            <button className='cardTitle'>
              {item.title}

            </button>  
              <Card.Text>
                {item.item.slice(0,3).map((task, taskIndex) => (
                  <li key={taskIndex}>{task.task}</li>
                ))}
              </Card.Text>
              <div style={{ display: "flex", bottom: '10px', position: 'absolute', right: '20px' }}>
                <button className='deleteButton' onClick={() => handleTodo(item)}><Image src={editIcon} className='logo' /></button>
                <button className='deleteButton' onClick={() => handleDelete(item.id)}><Image src={deleteIcon} className="logo" /></button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Row>
        <ModalComponent modal={modal} setModal={setModal} todo={todo} handleTask={handleTask} onDeleteTask={onDeleteTask}/>
        
        <Modal show={deleteAlert} onHide={()=>setDeleteAlert(!deleteAlert)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add ToDo</Modal.Title>
                </Modal.Header>
          <Modal.Footer>
                <Button variant="secondary" onClick={() => setDeleteAlert(false)}>
                    Close
                </Button>
                <Button variant="" onClick={() => setModal(false)}>
                    Close
                </Button>
                </Modal.Footer>
        </Modal>
    </div>
  );
};

export default ToDoComponent;
