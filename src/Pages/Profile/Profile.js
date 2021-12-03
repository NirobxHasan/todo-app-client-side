import React, { useState } from 'react';
import { Card, Container, Button, Alert } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
const Profile = () => {
    const { user, updateProfileInfo, authError, deleteAccount } = useAuth();
    const [name, setName] = useState(user.displayName);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const updateProfile = (e) => {
        e.preventDefault();
        const newInfo = { email, name };

        fetch(`https://quiet-crag-38399.herokuapp.com/users/${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newInfo)
        })
            .then((res) => res.json)
            .then((data) => {});
        updateProfileInfo(name, email, password);
        window.location.reload();
    };

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header
                    as="h5"
                    style={{ backgroundColor: 'gray', color: 'white' }}
                >
                    Update your Profile
                </Card.Header>
                <Card.Body>
                    <form onSubmit={updateProfile}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                onChange={(e) => setName(e.target.value)}
                                defaultValue={name}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleFormControlInput1"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                defaultValue={email}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <div className="d-flex">
                            <Button
                                className="me-3"
                                type="submit"
                                variant="primary"
                            >
                                Save Change
                            </Button>
                        </div>
                    </form>
                    <Button
                        className="mt-3"
                        onClick={deleteAccount}
                        type="submit"
                        variant="danger"
                    >
                        Delete Account
                    </Button>
                    {authError && (
                        <Alert className="mx-auto" variant="danger">
                            {authError}
                        </Alert>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;
