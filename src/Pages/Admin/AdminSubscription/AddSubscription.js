import React, { useState } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

const AddSubscription = () => {
    const [package_name, setPackage_name] = useState('');
    const [price, setPrice] = useState(0);
    const [limit, setLimit] = useState(0);
    const history = useHistory();
    const handleSubscriptioForm = (e) => {
        e.preventDefault();
        // setPrice(parseInt(price));
        // setLimit(parseInt(limit));
        const sub = { package_name, price, limit };
        fetch('https://quiet-crag-38399.herokuapp.com/subscription', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sub)
        })
            .then((res) => res.json())
            .then((data) => {
                alert('Successfully added Subscription!');
                history.push('/allSubscription');
            });
    };
    return (
        <Container className="mt-3">
            <Card>
                <Card.Header as="h5">Add Subscription</Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubscriptioForm}>
                        <div className="mb-2 mx-auto">
                            <label htmlFor="title" className="form-label">
                                Package Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                onBlur={(e) => setPackage_name(e.target.value)}
                            />
                        </div>
                        <div className="mb-2 mx-auto">
                            <label htmlFor="price" className="form-label">
                                Price
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                required
                                onBlur={(e) =>
                                    setPrice(parseInt(e.target.value))
                                }
                            />
                        </div>
                        <div className="mb-2 mx-auto">
                            <label htmlFor="limit" className="form-label">
                                Limit
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="limit"
                                required
                                onBlur={(e) =>
                                    setLimit(parseInt(e.target.value))
                                }
                            />
                        </div>

                        <div className="d-flex justify-content-center">
                            <Button
                                className="mx-auto"
                                type="submit"
                                variant="primary"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddSubscription;
