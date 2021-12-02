import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';

const PurchasePackage = () => {
    const { id } = useParams();
    const [subPackage, setSubPackage] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/subscriptions/${id}`)
            .then((res) => res.json())
            .then((data) => setSubPackage(data));
    }, []);
    return <Container>{subPackage.price}</Container>;
};

export default PurchasePackage;
