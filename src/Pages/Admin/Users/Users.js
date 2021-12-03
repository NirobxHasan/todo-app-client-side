import React, { useEffect, useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import User from '../User/User';
const Users = () => {
    const [users, setUsers] = useState([]);
    const [updateToggle, setUpdateToggle] = useState(false);
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then((req) => req.json())
            .then((data) => setUsers(data));
    }, [updateToggle]);

    //Update User
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = (id) => {
        console.log(id);
        setName('');
        setEmail('');
        fetch(`http://localhost:5000/user/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setName(data.displayName);
                setEmail(data.email);
            });

        setShow(true);
    };

    const handleUserUpdate = (e) => {
        e.preventDefault();
        const updatedUser = {
            name,
            email
        };
        fetch(`http://localhost:5000/users/${user.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.matchedCount) {
                    setUpdateToggle(!updateToggle);
                }
            });
        setShow(false);
    };

    //Handle Delete
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/user/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount) {
                    alert('successfully deleted');
                    const rest_users = users.filter((user) => user._id !== id);
                    setUsers(rest_users);
                }
            });
    };

    return (
        <Container>
            <h4 className="text-center my-3">All User</h4>
            {users.map((user) => (
                <User
                    key={user.email}
                    user={user}
                    handleDelete={handleDelete}
                    handleShow={handleShow}
                />
            ))}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleUserUpdate}>
                    <Modal.Body>
                        <div className="mb-2 mx-auto">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                defaultValue={name}
                                type="text"
                                className="form-control"
                                id="name"
                                onBlur={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                defaultValue={email}
                                className="form-control"
                                id="email"
                                type="email"
                                onBlur={(e) => setEmail(e.target.value)}
                            ></input>
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

export default Users;
