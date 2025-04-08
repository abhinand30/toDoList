import React, { useState } from "react";
import {  Button, Container, Form, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import { todoForm } from "../common/data/dataArray";
import { db } from "../firebase";




function AddTodoPage() {
  const { todo } = useParams();
  
  const navigate=useNavigate();
  
  const [date, setDate] = useState<Date | null>(new Date());
  const [loading,setLoading]=useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    date: null,
  });
  

  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      setDate(selectedDate);
      setFormData({ ...formData, date: selectedDate });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async(e: React.FormEvent) => {
    e.preventDefault();


    const isValid = todoForm.every(field => {
      if (field.required) {
        return formData[field.name as keyof typeof formData];
      }
      return true;
    });

    if (!isValid) {
      
      alert("Please fill in all required fields.");
      return;
    }
    try{
      setLoading(!loading)
        await addDoc(collection(db, "todo"), {
            title: formData.title,
            description:formData.description,
            status:formData.status,
            date:date
          });
          setLoading(!loading)
         alert('Todo Successfully Added');
         navigate('/')
         
    }catch(error){
        console.log(error)
        alert('Error occured while adding data');
        setLoading(!loading)
    }
  };

  return (
    <div>
      <Header />
      <Container style={{ borderWidth: "10px", borderColor: "#000", padding: "20px" }}>
        <Form noValidate onSubmit={onSubmit}>
          {todoForm.map((field) => (
            <Form.Group key={field.id} className="mb-3">
              <Form.Label style={{textTransform:'capitalize'}}>{field.name}</Form.Label>
              {field.type === "select" ? (
                <Form.Select name={field.name} onChange={(e)=>handleChange(e)} required={field.required}>
                  <option value="">Select Status</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
              ) : field.type === "textarea" ? (
                <Form.Control as="textarea" name={field.name} rows={3} onChange={(e)=>handleChange(e)} required={field.required} />
              ) : (
                <Form.Control type={field.type} name={field.name} placeholder={field.name} onChange={(e)=>handleChange(e)} required={field.required} />
              )}
            </Form.Group>
          ))}

          <div>
            <p style={{ marginTop: "20px" }}>Select Date</p>
            <DatePicker className="datePicker" selected={date} onChange={handleDateChange} showTimeSelect dateFormat="Pp" />
          </div>
          {loading?(
            <Spinner animation="border" color="#000"/>
          ):(
            <Button type="submit" className="buttonContainer">
            Add To-Do
          </Button>
          )}
          
        </Form>
      </Container>
    </div>
)}

export default AddTodoPage;