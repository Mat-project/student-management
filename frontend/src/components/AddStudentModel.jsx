import React from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { addStudents } from '../services/Api';

const AddStudentModel = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const studentData = Object.fromEntries(formData.entries());
        addStudents(studentData)
            .then((result) => {
                console.log("here")
                alert(result);
                console.log("here 1")
                props.setupdated(true);
                console.log("here 2")
                props.onHide(); 
                console.log("here 3")// Close the modal after successful submission
            })
            .catch((error) => {
                console.log("here 4")
                alert("Failed to Add Student");
            });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Fill In Student Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="FirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="FirstName" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="LastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="LastName" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="RegistrationNo">
                                <Form.Label>Registration No.</Form.Label>
                                <Form.Control type="text" name="RegistrationNo" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="Email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="Email" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="Course">
                                <Form.Label>Course</Form.Label>
                                <Form.Control type="text" name="Course" required placeholder="" />
                            </Form.Group>
                            <Form.Group>
                                <p></p>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddStudentModel;
