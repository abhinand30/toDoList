import { useEffect, useState } from 'react'
import { Button, Image, Table } from 'react-bootstrap'
import { db } from '../firebase';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

import editIcon from '../assets/editIcon.png';
import deleteIcon from '../assets/deleteIcon.png'
import { todoItem } from '../common/types';

function TodoTable() {
  const navigate = useNavigate();
  const currentTime = moment().unix()

  const [todoData, setTodoData] = useState<todoItem[]>([]);
  const [update, setUpdate] = useState<boolean>(false);


  useEffect(() => {
    const handleData = async () => {
      try {
        const todos: todoItem[] = []
        const querySnapshot = await getDocs(collection(db, "todo"));
        querySnapshot.forEach((doc) => {
          todos.push({ ...doc.data(), id: doc.id });
        });
        setTodoData(todos);
      } catch (error) {
        console.log(error)
        alert('Error while fetching todo data')
      }
    }
    handleData();
  }, [update])


  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you want to delete todo?');
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "todo", id));
      setUpdate(prev => !prev);

      alert('Deleted successfully');
    } catch (error) {
      console.log(error);
      alert('Error while deleting data');
    }
  };

  const onNavigate = (todo: todoItem) => {
    navigate("/add-todo", { state: todo });
  };

  

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

          {todoData.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.date ? moment.unix(todo.date.seconds).format("dddd, Do MMMM YYYY, h:mm A") : "Invalid Date"}</td>
              <td>{todo.date.seconds > currentTime ? todo.status : 'Completed'}</td>
              <td>
                {todo.date.seconds < currentTime || todo.status === 'In Progress' && (
                  <>
                    <Button className='Button' onClick={() => onNavigate(todo)}>
                      <Image src={editIcon} className='logo' />
                    </Button>
                    <Button className='Button' onClick={() => handleDelete(todo.id)}>
                      <Image src={deleteIcon} className='logo' />
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default TodoTable