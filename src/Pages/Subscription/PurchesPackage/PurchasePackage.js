import React, { useEffect, useRef, useState } from 'react';
import { Card, Container, ListGroup, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import Payment from '../Payment/Payment';

const PurchasePackage = () => {
    const { id } = useParams();
    const [subPackage, setSubPackage] = useState({});
    const [conform, setConform] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:5000/subscriptions/${id}`)
            .then((res) => res.json())
            .then((data) => setSubPackage(data));
    }, []);

    //sb-t47hfu8827067@personal.example.com
    //J!DI;2Ma
    return (
        <Container className="d-flex justify-content-center align-items-center login-container">
            <Card style={{ width: '20rem' }}>
                <Card.Body>
                    <h2>{subPackage.package_name}</h2>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            Note Limit: {subPackage.limit}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: {subPackage.price} $
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {conform ? (
                                <Payment subPackage={subPackage} />
                            ) : (
                                <Button
                                    onClick={() => setConform(true)}
                                    variant="primary"
                                >
                                    Pay
                                </Button>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PurchasePackage;
