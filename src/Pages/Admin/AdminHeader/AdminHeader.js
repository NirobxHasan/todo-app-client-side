import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const AdminHeader = () => {
    const { user, admin, logOut } = useAuth();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Admin-panel</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">
                            Home
                        </Nav.Link>
                        {admin && (
                            <Nav.Link as={Link} to="/users">
                                Users
                            </Nav.Link>
                        )}
                        {admin && (
                            <Nav.Link as={Link} to="/adminSubscription">
                                Add subscription
                            </Nav.Link>
                        )}
                        {admin && (
                            <Nav.Link as={Link} to="/allSubscription">
                                All subscription
                            </Nav.Link>
                        )}
                    </Nav>

                    <Nav>
                        {user.displayName ? (
                            <Navbar.Text style={{ color: '#fff' }}>
                                Signed in as:{' '}
                                <Link to="/profile" style={{ color: '#fff' }}>
                                    {user.displayName}
                                </Link>
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

export default AdminHeader;
