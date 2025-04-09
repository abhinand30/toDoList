import { useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import { todoForm } from "../common/data/dataArray";
import { db } from "../firebase";
import { todoState } from "../common/types";



function AddTodoPage() {
  const location = useLocation();
  const todo = location.state;

  const navigate = useNavigate();
  const todoDate=todo?.date.seconds?new Date(todo?.date.seconds * 1000):new Date();
  
  const [date, setDate] = useState<Date>(todoDate);
  const [loading, setLoading] = useState<boolean>(false);
 
  const [formData, setFormData] = useState<todoState>({
    title: todo?.title || "",
    description: todo?.description || "",
    status: todo?.status || "In Progress",
    date: todo?.date.seconds || null,
  });


  const handleDateChange = (selectedDate: Date | null) => {
    console.log(selectedDate,'>>>')
    if (selectedDate) {
      setDate(selectedDate);
      setFormData({ ...formData, date: selectedDate });
    }
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    const {name,value}=e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const onSubmit:React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const isValid = todoForm.every(field => {
      if (field.required) {
        return formData[field.name as keyof typeof formData];
      }
      return true;
    });

    if (!isValid) {
      alert("Please fill all fields.");
      return;
    }
    try {
      setLoading(true);
  
      if (todo?.id) {
    
        const todoRef = doc(db, "todo", todo.id);
        await updateDoc(todoRef, {
          title: formData.title,
          description: formData.description,
          status: formData.status,
          date: date,
        });
        alert("Todo successfully updated");
      } else {
        
        await addDoc(collection(db, "todo"), {
          title: formData.title,
          description: formData.description,
          status: formData.status,
          date: date,
        });
        alert("Todo successfully added");
      }
  
      navigate("/");
    } catch (error) {
      console.error("Error while saving todo:", error);
      alert("Error occurred while adding data.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <Header />
      <Container style={{ borderWidth: "10px", borderColor: "#000", padding: "20px" }}>
        <Form noValidate onSubmit={onSubmit}>
          {todoForm.map((field) => (
            <>
              {field.type === "select" && todo  ? (
                <Form.Group key={field.id} className="mb-3">
              <Form.Label style={{ textTransform: 'capitalize' }}>{field.name}</Form.Label>
                <Form.Select
                  name={field.name}
                  defaultValue={'In Progress'}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  disabled={todo?false:true}
                >
                  {/* <option value="">Select Status</option> */}
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
                </Form.Group>
              ) : field.type === "textarea" ? (
                <Form.Group>
                   <Form.Label style={{ textTransform: 'capitalize' }}>{field.name}</Form.Label>
                <Form.Control
                  as="textarea"
                  name={field.name}
                  rows={3}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                />
                </Form.Group>
              ) :field.type === "text" ? (
                <Form.Group>
                   <Form.Label style={{ textTransform: 'capitalize' }}>{field.name}</Form.Label>
                <Form.Control
                  type={field.type}
                  name={field.name}
                  placeholder={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                />
                </Form.Group>
              )
            :(null)}

            </>
          ))}

          <div>
            <p style={{ marginTop: "20px" }}>Select Date</p>
            <DatePicker className="datePicker" selected={date} onChange={handleDateChange}
            minDate={date} showTimeSelect dateFormat="Pp" />
          </div>
          {loading ? (
            <Spinner animation="border" color="#000" />
          ) : (
            <Button type="submit" className="buttonContainer">
              {todo ? "Update To-Do" : "Add To-Do"}
            </Button>

          )}

        </Form>
      </Container>
    </div>
  )
}

export default AddTodoPage;


