import React, { useEffect, useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import Note from '../Note/Note';
import DatePicker from 'react-date-picker';

const AllNotes = () => {
    const [notes, setNotes] = useState([]);
    const [updateToggle, setUpdateToggle] = useState(false);
    const [allNotes, setAllNotes] = useState(true);
    const { user } = useAuth();

    //Load Users data

    useEffect(() => {
        fetch(`http://localhost:5000/notes/${user.email}`)
            .then((res) => res.json())
            .then((data) => setNotes(data));
    }, [updateToggle, allNotes]);

    //test
    //Filter
    const [filterDate, setFilterDate] = useState(new Date());

    useEffect(() => {
        fetch(
            `http://localhost:5000/filterNotes?email=${user.email}&date=${filterDate}`
        )
            .then((res) => res.json())
            .then((data) => setNotes(data));
    }, [updateToggle, filterDate]);

    useEffect(() => {
        fetch(`http://localhost:5000/notes/${user.email}`)
            .then((res) => res.json())
            .then((data) => setNotes(data));
    }, [updateToggle, allNotes]);

    //Handle Delete
    const handleDelete = (id) => {
        console.log(id);

        fetch(`http://localhost:5000/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount) {
                    const rest_notes = notes.filter((note) => note._id !== id);
                    setNotes(rest_notes);
                }
            });
    };

    //update
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [singleNote, setSingleNote] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = (id) => {
        console.log(id);
        setTitle('');
        setNote('');
        setDate('');
        fetch(`http://localhost:5000/note/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setSingleNote(data);
                setTitle(data.title);
                setNote(data.note);
                setDate(new Date(data.date));
            });

        setShow(true);
    };
    const handleNoteUpdate = (e) => {
        e.preventDefault();
        const updatedNote = {
            title,
            note,
            date: date.toLocaleDateString()
        };
        fetch(`http://localhost:5000/noteupdate/${singleNote._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedNote)
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.matchedCount) {
                    setUpdateToggle(!updateToggle);
                }
            });
        setShow(false);
    };

    return (
        <Container>
            <div className="d-flex my-3">
                <Button
                    className="me-3"
                    variant="secondary"
                    size="sm"
                    onClick={() => setAllNotes(!allNotes)}
                >
                    All Notes
                </Button>
                <h5 className="me-3">Filter By Date:</h5>

                <DatePicker
                    style={{ padding: '10px' }}
                    onChange={(filterDate) => setFilterDate(filterDate)}
                    value={filterDate}
                />
            </div>
            {notes.map((note) => (
                <Note
                    key={note._id}
                    handleDelete={handleDelete}
                    handleShow={handleShow}
                    note={note}
                />
            ))}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Notes</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleNoteUpdate}>
                    <Modal.Body>
                        <div className="mb-2 mx-auto">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                defaultValue={title}
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                onBlur={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="Note" className="form-label">
                                Write your note
                            </label>
                            <textarea
                                defaultValue={note}
                                className="form-control"
                                id="note"
                                rows="3"
                                onBlur={(e) => setNote(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-1">
                            <DatePicker
                                className="p-3"
                                style={{ padding: '10px' }}
                                onChange={(date) => setDate(date)}
                                value={date}
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

export default AllNotes;
