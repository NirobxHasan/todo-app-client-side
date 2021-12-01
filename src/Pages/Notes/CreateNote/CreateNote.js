import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

const CreateNote = () => {
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    const handleNoteForm = (e) => {
        e.preventDefault();
        const data = { title, note, date: date.toLocaleDateString() };
        console.log(data);
    };

    return (
        <div>
            <div class="container-lg">
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
