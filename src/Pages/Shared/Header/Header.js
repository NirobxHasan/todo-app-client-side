import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './Header.css';
const Header = () => {
    const { user, logOut } = useAuth();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Todo App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">
                            Home
                        </Nav.Link>
                        {}

                        {user.email && (
                            <Nav.Link as={Link} to="/createnote">
                                Create Note
                            </Nav.Link>
                        )}
                        {user.email && (
                            <Nav.Link as={Link} to="/allnotes">
                                Notes
                            </Nav.Link>
                        )}
                    </Nav>

                    <Nav>
                        <Nav.Link className="me-3" as={Link} to="/subscription">
                            Subscription
                        </Nav.Link>

                        {user.displayName ? (
                            <Navbar.Text style={{ color: '#fff' }}>
                                Signed in as:{' '}
                                <a href="#login" style={{ color: '#fff' }}>
                                    {user.displayName}
                                </a>
                            </Navbar.Text>
                        ) : (
                            ''
                        )}
                        {user.email ? (
                            <button
                                className="ms-3 log-btn"
                                onClick={() => logOut()}
                            >
                                Logout
                            </button>
                        ) : (
                            <div>
                                <Link to="/login">
                                    <button className="log-btn">Login</button>
                                </Link>
                                <Link to="/registration">
                                    <button className="log-btn">
                                        Registration
                                    </button>
                                </Link>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
