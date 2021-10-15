import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useAuth } from "../context/auth";
import  Router from "next/router";

const NavigationBar = () => {

  const { token, logout } = useAuth();
  const handleLogout = () => {
    logout();
    Router.replace("/login");
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Diary App</Navbar.Brand>
          <Nav className="me-auto">
            {!token && (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
            {token && (
              <Button
                variant="danger"
                style={{ position: "absolute", right: "10px", top: "10px" }}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
