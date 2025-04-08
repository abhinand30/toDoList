import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function TitleContainer() {
  const navigate=useNavigate();
  return (
   <div className='searchContainer'>
       <h3>Todo List</h3>
        <Button onClick={()=>navigate('/add-todo')}>
          +
        </Button>
     
   </div>
  )
}

export default TitleContainer