import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Table, ProgressBar } from 'react-bootstrap';
import { FaUserGraduate, FaBook, FaChartPie, FaListAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { getStudents } from '../services/Api';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    coursesStats: [],
    studentsByEmail: { gmail: 0, yahoo: 0, hotmail: 0, other: 0 },
  });

  useEffect(() => {
    getStudents()
      .then((data) => {
        setStudents(data);
        calculateStats(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const calculateStats = (data) => {
    // Count total students
    const total = data.length;

    // Count students by course
    const courseCount = {};
    data.forEach(student => {
      if (student.Course) {
        courseCount[student.Course] = (courseCount[student.Course] || 0) + 1;
      }
    });

    // Sort courses by student count (descending)
    const sortedCourses = Object.entries(courseCount)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / total) * 100)
      }));

    // Count students by email domain
    const emailStats = { gmail: 0, yahoo: 0, hotmail: 0, other: 0 };
    data.forEach(student => {
      if (student.Email) {
        const email = student.Email.toLowerCase();
        if (email.includes('@gmail')) {
          emailStats.gmail++;
        } else if (email.includes('@yahoo')) {
          emailStats.yahoo++;
        } else if (email.includes('@hotmail') || email.includes('@outlook')) {
          emailStats.hotmail++;
        } else {
          emailStats.other++;
        }
      }
    });

    setStats({
      totalStudents: total,
      coursesStats: sortedCourses,
      studentsByEmail: emailStats
    });
  };

  // Function to get random recent dates
  const getRecentDate = (index) => {
    const today = new Date();
    const daysAgo = index * 2; // Spaced out by 2 days each
    const date = new Date(today);
    date.setDate(today.getDate() - daysAgo);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Colors for the progress bars
  const progressColors = [
    'primary', 'success', 'info', 'warning', 'danger'
  ];

  return (
    <Container fluid className="dashboard-container">
      {loading ? (
        <div className="loading-container">
          <ClipLoader color="#3498db" loading={loading} size={50} />
          <p className="mt-3">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <div className="d-flex align-items-center mb-4">
            <div className="feature-icon me-3">
              <FaChartPie size={24} />
            </div>
            <h2 className="page-title mb-0">Dashboard</h2>
          </div>

          {/* Stats Cards */}
          <Row className="mb-4">
            <Col lg={3} md={6} className="mb-4">
              <Card className="content-card h-100 border-left-primary">
                <Card.Body className="d-flex align-items-center">
                  <div className="feature-icon me-3" style={{ background: 'rgba(52, 152, 219, 0.1)' }}>
                    <FaUserGraduate size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-uppercase mb-1 text-muted">Total Students</div>
                    <div className="h3 mb-0 font-weight-bold">{stats.totalStudents}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <Card className="content-card h-100 border-left-success">
                <Card.Body className="d-flex align-items-center">
                  <div className="feature-icon me-3" style={{ background: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71' }}>
                    <FaBook size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-uppercase mb-1 text-muted">Total Courses</div>
                    <div className="h3 mb-0 font-weight-bold">{stats.coursesStats.length}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <Card className="content-card h-100 border-left-info">
                <Card.Body className="d-flex align-items-center">
                  <div className="feature-icon me-3" style={{ background: 'rgba(52, 152, 219, 0.1)' }}>
                    <FaListAlt size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-uppercase mb-1 text-muted">Avg Students per Course</div>
                    <div className="h3 mb-0 font-weight-bold">
                      {stats.coursesStats.length > 0 
                        ? Math.round(stats.totalStudents / stats.coursesStats.length) 
                        : 0}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <Card className="content-card h-100 border-left-warning">
                <Card.Body className="d-flex align-items-center">
                  <div className="feature-icon me-3" style={{ background: 'rgba(243, 156, 18, 0.1)', color: '#f39c12' }}>
                    <FaCalendarAlt size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-uppercase mb-1 text-muted">Latest Update</div>
                    <div className="h5 mb-0 font-weight-bold">{new Date().toLocaleDateString()}</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Course Distribution and Recent Activity */}
          <Row>
            <Col lg={8} className="mb-4">
              <Card className="content-card h-100">
                <Card.Header className="py-3 d-flex align-items-center">
                  <h3 className="section-title m-0">Student Distribution by Course</h3>
                </Card.Header>
                <Card.Body>
                  {stats.coursesStats.length > 0 ? (
                    <div>
                      {stats.coursesStats.slice(0, 5).map((course, index) => (
                        <div key={course.name} className="mb-4">
                          <div className="d-flex justify-content-between mb-1">
                            <span>{course.name}</span>
                            <span>{course.percentage}% ({course.count} students)</span>
                          </div>
                          <ProgressBar 
                            variant={progressColors[index % progressColors.length]} 
                            now={course.percentage} 
                            style={{ height: '8px' }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <p>No course data available</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} className="mb-4">
              <Card className="content-card h-100">
                <Card.Header className="py-3 d-flex align-items-center">
                  <h3 className="section-title m-0">Recent Activity</h3>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="list-group list-group-flush">
                    <div className="list-group-item d-flex justify-content-between align-items-center py-3">
                      <div>
                        <div className="font-weight-bold">Student added</div>
                        <div className="small text-muted">New student registration</div>
                      </div>
                      <span className="badge bg-success rounded-pill">{getRecentDate(0)}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between align-items-center py-3">
                      <div>
                        <div className="font-weight-bold">Student updated</div>
                        <div className="small text-muted">Student information updated</div>
                      </div>
                      <span className="badge bg-info rounded-pill">{getRecentDate(1)}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between align-items-center py-3">
                      <div>
                        <div className="font-weight-bold">Course added</div>
                        <div className="small text-muted">New course created</div>
                      </div>
                      <span className="badge bg-primary rounded-pill">{getRecentDate(2)}</span>
                    </div>
                    <div className="list-group-item d-flex justify-content-between align-items-center py-3">
                      <div>
                        <div className="font-weight-bold">Student removed</div>
                        <div className="small text-muted">Student record deleted</div>
                      </div>
                      <span className="badge bg-danger rounded-pill">{getRecentDate(3)}</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Students Table */}
          <Row>
            <Col lg={12} className="mb-4">
              <Card className="content-card">
                <Card.Header className="py-3 d-flex justify-content-between align-items-center">
                  <h3 className="section-title m-0">Recent Students</h3>
                  <Link to="/students" className="btn btn-sm btn-primary">View All</Link>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="table-responsive">
                    <Table className="data-table mb-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Registration No</th>
                          <th>Email</th>
                          <th>Course</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.slice(0, 5).map((student) => (
                          <tr key={student.studentId}>
                            <td>{student.studentId}</td>
                            <td>{`${student.FirstName} ${student.LastName}`}</td>
                            <td>{student.RegisterNo}</td>
                            <td>{student.Email}</td>
                            <td>{student.Course}</td>
                          </tr>
                        ))}
                        {students.length === 0 && (
                          <tr>
                            <td colSpan="5" className="text-center py-4">
                              No students found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Email Distribution */}
          <Row>
            <Col lg={12} className="mb-4">
              <Card className="content-card">
                <Card.Header className="py-3 d-flex align-items-center">
                  <div className="me-3">
                    <FaUsers size={18} />
                  </div>
                  <h3 className="section-title m-0">Student Email Distribution</h3>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={3} className="mb-4 mb-md-0">
                      <div className="text-center">
                        <div className="h5">Gmail</div>
                        <div className="display-4">{stats.studentsByEmail.gmail}</div>
                        <div className="small text-muted">
                          {stats.totalStudents > 0 
                            ? Math.round((stats.studentsByEmail.gmail / stats.totalStudents) * 100) 
                            : 0}% of total
                        </div>
                      </div>
                    </Col>
                    <Col md={3} className="mb-4 mb-md-0">
                      <div className="text-center">
                        <div className="h5">Yahoo</div>
                        <div className="display-4">{stats.studentsByEmail.yahoo}</div>
                        <div className="small text-muted">
                          {stats.totalStudents > 0 
                            ? Math.round((stats.studentsByEmail.yahoo / stats.totalStudents) * 100) 
                            : 0}% of total
                        </div>
                      </div>
                    </Col>
                    <Col md={3} className="mb-4 mb-md-0">
                      <div className="text-center">
                        <div className="h5">Hotmail/Outlook</div>
                        <div className="display-4">{stats.studentsByEmail.hotmail}</div>
                        <div className="small text-muted">
                          {stats.totalStudents > 0 
                            ? Math.round((stats.studentsByEmail.hotmail / stats.totalStudents) * 100) 
                            : 0}% of total
                        </div>
                      </div>
                    </Col>
                    <Col md={3} className="mb-4 mb-md-0">
                      <div className="text-center">
                        <div className="h5">Other</div>
                        <div className="display-4">{stats.studentsByEmail.other}</div>
                        <div className="small text-muted">
                          {stats.totalStudents > 0 
                            ? Math.round((stats.studentsByEmail.other / stats.totalStudents) * 100) 
                            : 0}% of total
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
