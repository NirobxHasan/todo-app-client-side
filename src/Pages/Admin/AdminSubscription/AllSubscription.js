import React, { useEffect, useState } from 'react';
import { Container, Modal, Button, Row } from 'react-bootstrap';
import AdminPackage from './AdminPackage';

const AllSubscription = () => {
    const [subscriptions, setSubscription] = useState([]);
    const [updateToggle, setUpdateToggle] = useState(false);
    useEffect(() => {
        fetch('https://quiet-crag-38399.herokuapp.com/subscriptions')
            .then((res) => res.json())
            .then((data) => setSubscription(data));
    }, [updateToggle]);

    //Handle Delete
    const handleDelete = (id) => {
        fetch(`https://quiet-crag-38399.herokuapp.com/subscription/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount) {
                    alert('successfully deleted');
                    const rest_subs = subscriptions.filter(
                        (sub) => sub._id !== id
                    );
                    setSubscription(rest_subs);
                }
            });
    };
    //Update User
    const [package_name, setPackage_name] = useState('');
    const [price, setPrice] = useState(0);
    const [limit, setLimit] = useState(0);
    const [singlePackage, setsinglePackage] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = (id) => {
        setPackage_name('');
        setsinglePackage({});
        setPrice(0);
        setLimit(0);
        fetch(`https://quiet-crag-38399.herokuapp.com/subscriptions/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setsinglePackage(data);
                setPackage_name(data.package_name);
                setPrice(data.price);
                setLimit(data.limit);
            });

        setShow(true);
    };
    const handleSubscriptionUpdate = (e) => {
        e.preventDefault();
        const updatedPack = {
            package_name,
            price,
            limit
        };
        fetch(
            `https://quiet-crag-38399.herokuapp.com/subscription/${singlePackage._id}`,
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updatedPack)
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.matchedCount) {
                    setUpdateToggle(!updateToggle);
                }
            });
        setShow(false);
    };

    return (
        <Container className="mt-2">
            <h4 className="text-center">Our Subscription Package</h4>
            <Row xs={1} md={2} lg={3} className="g-3 mt-3">
                {subscriptions.map((sub) => (
                    <AdminPackage
                        key={sub._id}
                        sub={sub}
                        handleDelete={handleDelete}
                        handleShow={handleShow}
                    />
                ))}
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Subscription</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubscriptionUpdate}>
                    <Modal.Body>
                        <div className="mb-2 mx-auto">
                            <label htmlFor="title" className="form-label">
                                Package Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                defaultValue={singlePackage.package_name}
                                required
                                onBlur={(e) => setPackage_name(e.target.value)}
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
                                defaultValue={singlePackage.limit}
                                required
                                onBlur={(e) => setLimit(e.target.value)}
                            />
                        </div>
                        <div className="mb-2 mx-auto">
                            <label htmlFor="price" className="form-label">
                                Price
                            </label>
                            <input
                                defaultValue={singlePackage.price}
                                type="number"
                                className="form-control"
                                id="price"
                                onBlur={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </Container>
    );
};

export default AllSubscription;
