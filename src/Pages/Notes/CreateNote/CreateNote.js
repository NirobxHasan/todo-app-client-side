import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { useHistory } from 'react-router';
import useAuth from '../../../hooks/useAuth';
const CreateNote = () => {
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const history = useHistory();
    const { user } = useAuth();

    const handleNoteForm = (e) => {
        e.preventDefault();
        const data = {
            email: user.email,
            title,
            note,
            date: date.toLocaleDateString()
        };

        fetch('http://localhost:5000/notes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    alert('Successfully added notes!');
                    history.push('/allnotes');
                }
            });
        console.log(data);
    };

    return (
        <div>
            <div class="container-lg mt-5">
                <Card>
                    <Card.Header as="h5">Create Notes</Card.Header>
                    <Card.Body>
                        <form onSubmit={handleNoteForm}>
                            <div class="mb-2 mx-auto">
                                <label for="title" class="form-label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="title"
                                    required
                                    onBlur={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div class="mb-2">
                                <label for="Note" class="form-label">
                                    Write your note
                                </label>
                                <textarea
                                    class="form-control"
                                    id="note"
                                    rows="3"
                                    onBlur={(e) => setNote(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div class="mb-1">
                                <DatePicker
                                    className="p-3"
                                    style={{ padding: '10px' }}
                                    onChange={(date) => setDate(date)}
                                    value={date}
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
            </div>
        </div>
    );
};

export default CreateNote;
