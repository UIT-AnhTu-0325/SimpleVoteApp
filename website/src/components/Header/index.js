import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
/**
 * @author
 * @function Header
 **/

export const Header = (props) => {
  const signout = () => {
    localStorage.clear();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>

          {localStorage.getItem("jwt") ? (
            <Nav>
              <li className="nav-item">
                <NavLink to="/" className="nav-link" onClick={signout}>
                  Signout
                </NavLink>
              </li>
            </Nav>
          ) : (
            <Nav>
              <li className="nav-item">
                <NavLink to="signin" className="nav-link">
                  Signin
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="signup" className="nav-link">
                  Signup
                </NavLink>
              </li>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
