import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import Note from '../Note/Note';

const AllNotes = () => {
    const [notes, setNotes] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:5000/notes/${user.email}`)
            .then((res) => res.json())
            .then((data) => setNotes(data));
    }, []);

    const handleDelete = (id) => {
        console.log(id);

        fetch(`http://localhost:5000/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount) {
                    const rest_notes = notes.filter((note) => note._id !== id);
                    setNotes(rest_notes);
                }
            });
    };

    return (
        <Container>
            {notes.map((note) => (
                <Note key={note._id} handleDelete={handleDelete} note={note} />
            ))}
        </Container>
    );
};

export default AllNotes;
