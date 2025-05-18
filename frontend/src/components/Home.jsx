import React from 'react';
import slide01 from '../static/slide01.jpg';
import slide02 from '../static/slide02.jpg';
import slide03 from '../static/slide03.jpg';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaUserCog, FaUserPlus, FaChartBar } from 'react-icons/fa';

const Home = () => {
  return (
    <Container fluid className="dashboard-container">
      <Card className="content-card mb-4">
        <Card.Body className="p-0">
          <Carousel 
            className="carousel-custom" 
            interval={4000} // Auto-rotate every 4 seconds
            controls={true}  // Show prev/next controls
            indicators={true} // Show indicators
          >
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={slide01}
                alt="First slide"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <h3>Welcome to Student Management System</h3>
                <p>Efficiently manage your student records with our intuitive platform</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={slide03}
                alt="Second slide"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <h3>Student Information at Your Fingertips</h3>
                <p>Access and update student data quickly and securely</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={slide02}
                alt="Third slide"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <h3>Streamlined Education Management</h3>
                <p>Focus on education while we help with the administrative tasks</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Card.Body>
      </Card>

      <h2 className="section-title mb-4">Quick Access</h2>
      
      <Row>
        <Col lg={3} md={6} className="mb-4">
          <Card className="feature-card">
            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
              <div className="feature-icon">
                <FaGraduationCap size={30} />
              </div>
              <Card.Title className="mb-3">Student Directory</Card.Title>
              <Card.Text>
                View complete list of all students enrolled in various courses
              </Card.Text>
              <Button as={Link} to="/students" variant="outline-primary" className="mt-auto">
                View Students
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className="feature-card">
            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
              <div className="feature-icon">
                <FaUserCog size={30} />
              </div>
              <Card.Title className="mb-3">Manage Students</Card.Title>
              <Card.Text>
                Add, edit or remove student records from our database system
              </Card.Text>
              <Button as={Link} to="/manage" variant="outline-primary" className="mt-auto">
                Manage Records
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className="feature-card">
            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
              <div className="feature-icon">
                <FaUserPlus size={30} />
              </div>
              <Card.Title className="mb-3">Add New Student</Card.Title>
              <Card.Text>
                Quickly register a new student with our streamlined process
              </Card.Text>
              <Button as={Link} to="/manage" variant="primary" className="mt-auto">
                Add Student
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className="feature-card">
            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
              <div className="feature-icon">
                <FaChartBar size={30} />
              </div>
              <Card.Title className="mb-3">System Overview</Card.Title>
              <Card.Text>
                Get insights about students, courses, and system performance
              </Card.Text>
              <Button as={Link} to="/dashboard" variant="outline-primary" className="mt-auto">
                View Dashboard
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-3">
        <Col>
          <Card className="content-card">
            <Card.Body>
              <h2 className="section-title mb-4">About This System</h2>
              <p>
                The Student Management System is designed to help educational institutions manage student information efficiently. 
                With our intuitive interface, administrators can easily add, update, and track student records.
              </p>
              <p>
                This system simplifies administrative tasks, allowing staff to focus on providing quality education rather than paperwork.
                From basic information management to advanced reporting, our platform scales with your needs.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;