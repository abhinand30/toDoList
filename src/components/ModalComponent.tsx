import React from 'react';
import { Button, Form, Image, Modal } from 'react-bootstrap';

import deleteIcon from "../assets/deleteIcon.png"
import { modalProps } from '../common/types';

const ModalComponent: React.FC<modalProps> = (props) => {
    const { modal, setModal, todo, handleTask,onDeleteTask } = props;
        
    return (
        <Modal show={modal} onHide={() => setModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{todo?.title || "No Title"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {todo?.item.filter((task) => !task.completed)
                    .map((task, index) => (
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
                {todo?.item.filter((task) => task.completed)
                    .map((task, index) => (
                        <div key={index} className="rowContainer">
                            <Form.Check
                                type="checkbox"
                                id={`${task.taskId}`}
                                label={
                                    <div className='listComponent'>
                                        <span style={{ textDecoration: "line-through", color: "red" }}>
                                            {task.task}
                                        </span>

                                    </div>
                                }
                                checked={task.completed}
                                onChange={() => handleTask(task.taskId)}
                            />
                            <button className='deleteButton' onClick={() => onDeleteTask(task.taskId)}>
                                <Image src={deleteIcon} alt="delete" className='logo' />
                            </button>
                        </div>
                    ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalComponent