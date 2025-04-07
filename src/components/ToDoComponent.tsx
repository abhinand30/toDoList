import { Card } from "react-bootstrap";
import { todoProps } from "../common/types";


const ToDoComponent:React.FC<todoProps>=(props)=> {
  const {toDo}=props;
  return (
    <div style={{display:'flex'}}>
      {toDo.map((item)=>(
        <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>
            
           {item.item.map((task)=>(
            <li>{task.task}</li>
           ))}

          </Card.Text>
  
        </Card.Body>
      </Card>
      ))}
        
    </div>
  )
}

export default ToDoComponent;