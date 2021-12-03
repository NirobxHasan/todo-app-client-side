import React, { useEffect, useState } from 'react';
import { Card, Col, ListGroup, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import useAuth from '../../../hooks/useAuth';
const Package = ({ sub }) => {
    const history = useHistory();
    const { user } = useAuth();
    const [userInfo, setuserInfo] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/users/${user.email}`)
            .then((res) => res.json())
            .then((user) => setuserInfo(user));
    }, []);

    const freeTrial = () => {
        console.log(userInfo);
        if (userInfo.subscription) {
            alert(
                `Sorry! You cannot take a free trial. You are already in ${userInfo.subscription.package_name} package.`
            );
            return;
        }
        fetch(`http://localhost:5000/users_subscription/${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sub)
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.matchedCount) {
                    alert('successfully added Free trial');
                    // history.push()
                }
            });
    };

    return (
        <Col>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>{sub.package_name}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Note Limit: {sub.limit}</ListGroup.Item>
                        <ListGroup.Item>Price: {sub.price} $</ListGroup.Item>
                        <ListGroup.Item className="my-auto">
                            {sub.price ? (
                                <Button
                                    onClick={() => {
                                        history.push(
                                            `/purchasePackage/${sub._id}`
                                        );
                                    }}
                                    variant="primary"
                                    size="sm"
                                >
                                    Purchase
                                </Button>
                            ) : (
                                <Button
                                    onClick={freeTrial}
                                    variant="secondary"
                                    size="sm"
                                >
                                    Free
                                </Button>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Package;
