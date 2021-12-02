import React from 'react';
import { Card, Col, ListGroup, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Package = ({ sub }) => {
    const history = useHistory();
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
                                onClick={() => {
                                    history.push(`/purchasePackage/${sub._id}`);
                                }}
                                variant="primary"
                                size="sm"
                            >
                                Purchase
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Package;
