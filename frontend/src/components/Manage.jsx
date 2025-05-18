import React, { useEffect, useState } from 'react';
import { Table, Form, InputGroup, Card, Container, Row, Col } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit, FaSearch, FaPlus, FaUserCog } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddStudentModel from './AddStudentModel';
import UpdateStudentModal from "./UpdateStudentModel";
import { getStudents, deleteStudents, registerLoadingCallback } from '../services/Api';
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';

const Manage = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editStudent, setEditStudent] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        const unregister = registerLoadingCallback(setLoading);
        
        if (students.length && !isUpdated) {
            return;
        }
        
        getStudents()
            .then(data => {
                if (mounted) {
                    setStudents(data);
                    setFilteredStudents(data);
                }
            });
            
        return () => {
            mounted = false;
            setIsUpdated(false);
            unregister();
        }
    }, [isUpdated, students]);

    useEffect(() => {
        if (searchTerm) {
            const filtered = students.filter(
                stu => 
                    stu.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    stu.LastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    stu.RegisterNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    stu.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    stu.Course?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredStudents(filtered);
        } else {
            setFilteredStudents(students);
        }
    }, [searchTerm, students]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleUpdate = (e, stu) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditStudent(stu);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleDelete = (e, studentId) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            e.preventDefault();
            deleteStudents(studentId)
                .then(() => {
                    setIsUpdated(true);
                })
                .catch(() => {
                    // Error is handled in the API service
                });
        }
    };

    let AddModelClose = () => setAddModalShow(false);
    let EditModelClose = () => setEditModalShow(false);
    
    return (
        <Container fluid className="dashboard-container">
            <Card className="content-card" style={{ marginTop: '20px' }}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div className="feature-icon me-3">
                            <FaUserCog size={24} />
                        </div>
                        <h2 className="page-title mb-0">Manage Students</h2>
                    </div>
                    
                    <div className="d-flex">
                        <div className="search-container m-0 me-3">
                            <InputGroup className="search-input-group">
                                <InputGroup.Text>
                                    <FaSearch />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Search students..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </InputGroup>
                        </div>
                        
                        <Button 
                            variant="primary" 
                            onClick={handleAdd} 
                            disabled={loading}
                            className="d-flex align-items-center"
                        >
                            <FaPlus className="me-2" /> Add Student
                        </Button>
                    </div>
                </Card.Header>
                
                <Card.Body>
                    {loading ? (
                        <div className="loading-container">
                            <ClipLoader color="#3498db" loading={loading} size={50} />
                            <p className="mt-3">Processing...</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <Table hover className="data-table mb-0">
                                <thead>
                                    <tr>
                                        <th width="5%">ID</th>
                                        <th width="15%">First Name</th>
                                        <th width="15%">Last Name</th>
                                        <th width="15%">Registration No</th>
                                        <th width="20%">Email</th>
                                        <th width="15%">Course</th>
                                        <th width="15%">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map((stu) => (
                                        <tr key={stu.studentId}>
                                            <td>{stu.studentId}</td>
                                            <td>{stu.FirstName}</td>
                                            <td>{stu.LastName}</td>
                                            <td>{stu.RegisterNo}</td>
                                            <td>{stu.Email}</td>
                                            <td>{stu.Course}</td>
                                            <td>
                                                <Button 
                                                    variant="danger"
                                                    onClick={event => handleDelete(event, stu.studentId)}
                                                    disabled={loading}
                                                    title="Delete Student"
                                                    className="action-button"
                                                >
                                                    <RiDeleteBin5Line />
                                                </Button>
                                                <Button 
                                                    variant="info"
                                                    onClick={event => handleUpdate(event, stu)}
                                                    disabled={loading}
                                                    title="Edit Student"
                                                    className="action-button"
                                                >
                                                    <FaEdit />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    
                                    {filteredStudents.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4">
                                                {students.length === 0 ? 
                                                    "No students found" : 
                                                    "No matching students found"
                                                }
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>
            
            <AddStudentModel 
                show={addModalShow} 
                setupdated={setIsUpdated} 
                onHide={AddModelClose}
            />
            
            <UpdateStudentModal 
                show={editModalShow} 
                student={editStudent} 
                setUpdated={setIsUpdated} 
                onHide={EditModelClose}
            />
        </Container>
    );
};

export default Manage;
