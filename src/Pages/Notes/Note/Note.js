import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const Note = ({ note, handleDelete }) => {
    return (
        <Card border="light" className="mt-3">
            <Card.Header className="fw-bold">{note.title}</Card.Header>
            <Card.Body>
                <Row>
                    <Col sx={12} sm={12} md={8} lg={10}>
                        <Card.Text>{note.note}</Card.Text>
                        <p>
                            <i>{note.date}</i>
                        </p>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={2} className="my-auto">
                        <Button
                            style={{ marginLeft: '5px' }}
                            size="sm"
                            variant="outline-secondary"
                        >
                            Update
                        </Button>{' '}
                        <Button
                            onClick={() => {
                                handleDelete(note._id);
                            }}
                            variant="outline-danger"
                            size="sm"
                        >
                            Delete
                        </Button>
                    </Col>
                </Row>
                <div></div>
                <div></div>
            </Card.Body>
        </Card>
    );
};

export default Note;
