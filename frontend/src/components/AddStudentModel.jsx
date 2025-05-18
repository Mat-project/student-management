import React, { useState } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { addStudents } from '../services/Api';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ClipLoader from "react-spinners/ClipLoader";
import { FaUser, FaEnvelope, FaGraduationCap, FaIdCard } from 'react-icons/fa';

// Validation schema
const validationSchema = Yup.object().shape({
    FirstName: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters'),
    LastName: Yup.string()
        .required('Last name is required')
        .min(1, 'Last name is required'), // Changed to min 1 character
    RegisterNo: Yup.string()
        .required('Registration number is required')
        .matches(/^[A-Za-z0-9]+$/, 'Registration number must contain only letters and numbers'),
    Email: Yup.string()
        .required('Email is required')
        .email('Invalid email format'),
    Course: Yup.string()
        .required('Course is required')
});

const AddStudentModel = (props) => {
    const [loading, setLoading] = useState(false);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="custom-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Student
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        FirstName: '',
                        LastName: '',
                        RegisterNo: '',
                        Email: '',
                        Course: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setLoading(true);
                        // Create form-like object for compatibility with existing API
                        const formData = {
                            FirstName: { value: values.FirstName },
                            LastName: { value: values.LastName },
                            RegisterNo: { value: values.RegisterNo },
                            Email: { value: values.Email },
                            Course: { value: values.Course }
                        };
                        
                        addStudents(formData)
                            .then(() => {
                                props.setupdated(true);
                                props.onHide();
                                resetForm();
                            })
                            .catch(() => {
                                // Error handled in API service
                            })
                            .finally(() => {
                                setLoading(false);
                                setSubmitting(false);
                            });
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="FirstName">
                                        <Form.Label>
                                            <FaUser className="me-2" /> First Name
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="FirstName"
                                            value={values.FirstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.FirstName && errors.FirstName}
                                            placeholder="Enter first name"
                                        />
                                        {touched.FirstName && errors.FirstName && (
                                            <div className="error-feedback">{errors.FirstName}</div>
                                        )}
                                    </Form.Group>
                                </Col>
                                
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="LastName">
                                        <Form.Label>
                                            <FaUser className="me-2" /> Last Name
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="LastName"
                                            value={values.LastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.LastName && errors.LastName}
                                            placeholder="Enter last name"
                                        />
                                        {touched.LastName && errors.LastName && (
                                            <div className="error-feedback">{errors.LastName}</div>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            <Form.Group className="mb-3" controlId="RegisterNo">
                                <Form.Label>
                                    <FaIdCard className="me-2" /> Registration No.
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="RegisterNo"
                                    value={values.RegisterNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.RegisterNo && errors.RegisterNo}
                                    placeholder="Enter registration number"
                                />
                                {touched.RegisterNo && errors.RegisterNo && (
                                    <div className="error-feedback">{errors.RegisterNo}</div>
                                )}
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="Email">
                                <Form.Label>
                                    <FaEnvelope className="me-2" /> Email
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    name="Email"
                                    value={values.Email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.Email && errors.Email}
                                    placeholder="Enter email address"
                                />
                                {touched.Email && errors.Email && (
                                    <div className="error-feedback">{errors.Email}</div>
                                )}
                            </Form.Group>
                            
                            <Form.Group className="mb-4" controlId="Course">
                                <Form.Label>
                                    <FaGraduationCap className="me-2" /> Course
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Course"
                                    value={values.Course}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.Course && errors.Course}
                                    placeholder="Enter course name"
                                />
                                {touched.Course && errors.Course && (
                                    <div className="error-feedback">{errors.Course}</div>
                                )}
                            </Form.Group>
                            
                            <div className="d-flex justify-content-end">
                                <Button 
                                    variant="secondary" 
                                    onClick={props.onHide} 
                                    disabled={isSubmitting || loading}
                                    className="me-2"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    disabled={isSubmitting || loading}
                                >
                                    {loading ? (
                                        <>
                                            <ClipLoader color="#ffffff" loading={loading} size={20} />
                                            <span className="ms-2">Submitting...</span>
                                        </>
                                    ) : 'Add Student'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default AddStudentModel;
