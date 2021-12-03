import React from 'react';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
const User = ({ user, handleDelete, handleShow }) => {
    return (
        <div>
            <Card border="dark" className="mt-3">
                <Card.Body>
                    <Row>
                        <Col sx={12} sm={12} md={8} lg={10}>
                            <Card.Text>Name: {user.displayName}</Card.Text>
                            <Card.Text>Email: {user.email}</Card.Text>
                            {user?.subscription && (
                                <Card.Text>
                                    Subscription:{' '}
                                    {user.subscription.package_name} {'  '},{' '}
                                    Rest limit:{user.subscription.limit}
                                </Card.Text>
                            )}
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={2} className="my-auto">
                            <Button
                                style={{ marginLeft: '5px' }}
                                size="sm"
                                variant="outline-secondary"
                                onClick={() => {
                                    handleShow(user._id);
                                }}
                            >
                                Update
                            </Button>{' '}
                            <Button
                                onClick={() => {
                                    handleDelete(user._id);
                                }}
                                variant="outline-danger"
                                size="sm"
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>
                    <div></div>
                    <div></div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default User;
