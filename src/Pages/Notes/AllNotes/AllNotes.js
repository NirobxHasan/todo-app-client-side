import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import Note from '../Note/Note';

const AllNotes = () => {
    const [notes, setNotes] = useState([]);
    const { user } = useAuth();

    const handleDelete = (id) => {
        console.log(id);
        fetch(`http://localhost:5000/notes/`);
    };

    useEffect(() => {
        fetch(`http://localhost:5000/notes/${user.email}`)
            .then((res) => res.json())
            .then((data) => setNotes(data));
    }, []);

    return (
        <Container>
            {notes.map((note) => (
                <Note key={note._id} handleDelete={handleDelete} note={note} />
            ))}
        </Container>
    );
};

export default AllNotes;
