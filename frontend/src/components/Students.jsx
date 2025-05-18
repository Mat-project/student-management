import { useEffect, useState } from "react";
import React from 'react';
import { getStudents, registerLoadingCallback } from '../services/Api';
import { Table, Form, InputGroup, Card, Container } from 'react-bootstrap';
import { FaSearch, FaUserGraduate } from 'react-icons/fa';
import ClipLoader from "react-spinners/ClipLoader";

const Students = () => {
  const [student, setStudent] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const unregister = registerLoadingCallback(setLoading);
    
    getStudents()
      .then((data) => {
        if (mounted) {
          setStudent(data);
          setFilteredStudents(data);
        }
      });
      
    return () => {
      mounted = false;
      unregister();
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = student.filter(
        stu => 
          stu.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stu.LastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stu.RegisterNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stu.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stu.Course?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(student);
    }
  }, [searchTerm, student]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container fluid className="dashboard-container">
      <Card className="content-card" style={{ marginTop: '20px' }}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="feature-icon me-3">
              <FaUserGraduate size={24} />
            </div>
            <h2 className="page-title mb-0">Students Directory</h2>
          </div>
          
          <div className="search-container m-0">
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
        </Card.Header>
        
        <Card.Body>
          {loading ? (
            <div className="loading-container">
              <ClipLoader color="#3498db" loading={loading} size={50} />
              <p className="mt-3">Loading students...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="data-table mb-0">
                <thead>
                  <tr>
                    <th width="5%">ID</th>
                    <th width="15%">First Name</th>
                    <th width="15%">Last Name</th>
                    <th width="20%">Registration No</th>
                    <th width="25%">Email</th>
                    <th width="20%">Course</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((stu) =>
                    <tr key={stu.studentId}>
                      <td>{stu.studentId}</td>
                      <td>{stu.FirstName}</td>
                      <td>{stu.LastName}</td>
                      <td>{stu.RegisterNo}</td>
                      <td>{stu.Email}</td>
                      <td>{stu.Course}</td>
                    </tr>
                  )}
                  
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        {student.length === 0 ? 
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
    </Container>
  );
};

export default Students;