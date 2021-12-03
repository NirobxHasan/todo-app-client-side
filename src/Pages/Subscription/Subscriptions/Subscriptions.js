import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Package from '../Package/Package';

const Subscriptions = () => {
    const [subscriptions, setSubscription] = useState([]);

    useEffect(() => {
        fetch('https://quiet-crag-38399.herokuapp.com/subscriptions')
            .then((res) => res.json())
            .then((data) => setSubscription(data));
    }, []);
    return (
        <Container>
            <h4 className="text-center">Our Subscription Package</h4>
            <Row xs={1} md={2} lg={3} className="g-3 mt-3">
                {subscriptions.map((sub) => (
                    <Package key={sub._id} sub={sub} />
                ))}
            </Row>
        </Container>
    );
};

export default Subscriptions;
