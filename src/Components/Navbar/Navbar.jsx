import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRecoilState } from 'recoil';
import { noteAtom } from '../Atoms/NoteAtom';
import './Navbar.css'

function NavbarComp() {
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const [notesLength, setNotesLength] = useRecoilState(noteAtom);

  function logout() {
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i className='fa-solid fa-note-sticky'></i> Notes App
        </Navbar.Brand>
        <Nav className="ms-auto">
          {!token ? (
            <>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-center align-items-center">
<i className="text-white fa-solid fa-box-open position-relative"></i>
              <span className='text-danger position-absolute iconPos fw-bold'>{notesLength}</span>
              </div>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </div>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
