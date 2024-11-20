import React from 'react'
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';

function Header() {
  return (
    <>
 <Navbar bg="white" expand="lg" className="px-5 shadow-sm">
      <Container fluid>
        {/* Brand Name */}
        <Navbar.Brand href="#" className="fw-bold text-dark">
          Discount-it
        </Navbar.Brand>

        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            {/* Products Dropdown */}
            <NavDropdown title="Products" id="products-dropdown">
              <NavDropdown.Item href="#product1">Product 1</NavDropdown.Item>
              <NavDropdown.Item href="#product2">Product 2</NavDropdown.Item>
              <NavDropdown.Item href="#product3">Product 3</NavDropdown.Item>
            </NavDropdown>

            {/* Resources Dropdown */}
            <NavDropdown title="Resources" id="resources-dropdown">
              <NavDropdown.Item href="#resource1">Resource 1</NavDropdown.Item>
              <NavDropdown.Item href="#resource2">Resource 2</NavDropdown.Item>
              <NavDropdown.Item href="#resource3">Resource 3</NavDropdown.Item>
            </NavDropdown>

            {/* Company Dropdown */}
            <NavDropdown title="Company" id="company-dropdown">
              <NavDropdown.Item href="#about">About Us</NavDropdown.Item>
              <NavDropdown.Item href="#careers">Careers</NavDropdown.Item>
              <NavDropdown.Item href="#contact">Contact Us</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Login/Signup Button */}
          <Button variant="primary" className="ms-3">
            Login/Signup
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        
    </>
  )
}

export default Header