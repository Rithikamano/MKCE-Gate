// Navbar.js
import React from 'react';
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaBars, FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function NavbarWithSidebar({ toggleSidebar }) {
  return (
    <Navbar expand="lg" variant="dark" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home">MKCE Entry Guard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home"><FaLightbulb /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarWithSidebar;
