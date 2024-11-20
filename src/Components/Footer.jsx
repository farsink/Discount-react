import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <>
        <footer className="bg-light py-5">
      <Container>
        <Row>
          {/* Brand and Description */}
          <Col md={4}>
            <h5 className="fw-bold text-dark">Discount-it</h5>
            <p className="text-muted">
              Discount-it is your one-stop solution for managing your finances with ease and accuracy. Explore our products and resources to simplify your tax journey.
            </p>
          </Col>

          {/* Products Links */}
          <Col md={2}>
            <h6 className="fw-bold">Products</h6>
            <ul className="list-unstyled">
              <li><a href="#product1" className="text-muted">Product 1</a></li>
              <li><a href="#product2" className="text-muted">Product 2</a></li>
              <li><a href="#product3" className="text-muted">Product 3</a></li>
            </ul>
          </Col>

          {/* Resources Links */}
          <Col md={2}>
            <h6 className="fw-bold">Resources</h6>
            <ul className="list-unstyled">
              <li><a href="#resource1" className="text-muted">Resource 1</a></li>
              <li><a href="#resource2" className="text-muted">Resource 2</a></li>
              <li><a href="#resource3" className="text-muted">Resource 3</a></li>
            </ul>
          </Col>

          {/* Company Links */}
          <Col md={2}>
            <h6 className="fw-bold">Company</h6>
            <ul className="list-unstyled">
              <li><a href="#about" className="text-muted">About Us</a></li>
              <li><a href="#careers" className="text-muted">Careers</a></li>
              <li><a href="#contact" className="text-muted">Contact Us</a></li>
            </ul>
          </Col>

          {/* Social Media Icons */}
          <Col md={2}>
            <h6 className="fw-bold">Follow Us</h6>
            <div className="d-flex">
              <a href="#facebook" className="text-muted me-3"><FaFacebook /></a>
              <a href="#twitter" className="text-muted me-3"><FaTwitter /></a>
              <a href="#instagram" className="text-muted me-3"><FaInstagram /></a>
              <a href="#linkedin" className="text-muted"><FaLinkedin /></a>
            </div>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <hr />
        <Row>
          <Col className="text-center text-muted">
            © {new Date().getFullYear()} cleartax. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
    </>
  )
}

export default Footer