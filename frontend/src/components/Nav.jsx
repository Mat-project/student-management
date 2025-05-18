import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav as BootstrapNav } from 'react-bootstrap';
import { FaHome, FaList, FaUserCog, FaBars, FaChartPie } from 'react-icons/fa';
import logo from '../static/logo.png';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar fixed-top">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <Navbar.Brand as={Link} to="/" className="app-logo">
            <img
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-center"
              alt="School Logo"
            />
            Student Management
          </Navbar.Brand>
          
          <button 
            className="btn btn-link text-light toggle-sidebar d-lg-none" 
            onClick={toggleSidebar}
          >
            <FaBars size={20} />
          </button>
        </div>
      </Navbar>
      
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <BootstrapNav className="flex-column mt-3">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "nav-link active d-flex align-items-center" : "nav-link d-flex align-items-center"
            }
            end
          >
            <FaHome className="me-3" /> Home
          </NavLink>
          
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              isActive ? "nav-link active d-flex align-items-center" : "nav-link d-flex align-items-center"
            }
          >
            <FaChartPie className="me-3" /> Dashboard
          </NavLink>
          
          <NavLink 
            to="/students" 
            className={({ isActive }) => 
              isActive ? "nav-link active d-flex align-items-center" : "nav-link d-flex align-items-center"
            }
          >
            <FaList className="me-3" /> Students List
          </NavLink>
          
          <NavLink 
            to="/manage" 
            className={({ isActive }) => 
              isActive ? "nav-link active d-flex align-items-center" : "nav-link d-flex align-items-center"
            }
          >
            <FaUserCog className="me-3" /> Manage Students
          </NavLink>
        </BootstrapNav>
      </div>
    </>
  );
}

export default Nav;
