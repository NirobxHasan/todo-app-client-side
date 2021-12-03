import React from 'react';
import { Card, Col, ListGroup, Button } from 'react-bootstrap';
const AdminPackage = ({ sub, handleDelete, handleShow }) => {
    return (
        <Col>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>{sub.package_name}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Note Limit: {sub.limit}</ListGroup.Item>
                        <ListGroup.Item>Price: {sub.price} $</ListGroup.Item>
                        <ListGroup.Item className="my-auto">
                            <Button
                                style={{ marginLeft: '5px' }}
                                size="sm"
                                variant="outline-secondary"
                                onClick={() => {
                                    handleShow(sub._id);
                                }}
                            >
                                Update
                            </Button>{' '}
                            <Button
                                onClick={() => {
                                    handleDelete(sub._id);
                                }}
                                variant="outline-danger"
                                size="sm"
                            >
                                Delete
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default AdminPackage;
