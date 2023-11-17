
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import './request.css';

function AccessRequestCard() {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState({
        ibmId: '',
        firstName: '',
        lastName: '',
        department: '',
        sexualIdentity: ''
    });
    const [invalidFields, setInvalidFields] = useState({});

    const handleInputChange = (e, field) => {
        setFormFields(prevState => ({
            ...prevState,
            [field]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newInvalidFields = {};

        for (let field in formFields) {
            if (!formFields[field]) {
                newInvalidFields[field] = true;
            }
        }

        if (Object.keys(newInvalidFields).length > 0) {
            alert("Please fill all the fields!");
            setInvalidFields(newInvalidFields);
            return;
        }

        alert('We have received your access request');
    };

    return (
        <div>
            <Navbar />
            <Card.Title className="text-left" style={{ marginLeft: '380px', marginBottom: '10px', fontSize:'40px', color: '#4A92FF'}}>Request Access</Card.Title>
            <div className="d-flex align-items-center justify-content-center">
                <Card style={{ width: '50rem', border: 'none' }} className="shadow-lg">
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail">
                                <Form.Label style={{ color: 'white', marginBottom: '0.1rem'}}>IBMid</Form.Label>
                                <Form.Control style={{ height: '35px' }} type="text" placeholder="Enter your IBMid" value={formFields.ibmId} onChange={(e) => handleInputChange(e, 'ibmId')} className={invalidFields.ibmId ? 'invalid-input' : ''} />
                            </Form.Group>
                            <Row>
                                <Form.Group as={Col} controlId="formFirstName">
                                    <Form.Label style={{ color: 'white', marginBottom: '0.1rem', marginTop: '1.0rem' }}>First Name</Form.Label>
                                    <Form.Control style={{ height: '35px' }} type="text" placeholder="Enter first name" value={formFields.firstName} onChange={(e) => handleInputChange(e, 'firstName')} className={invalidFields.firstName ? 'invalid-input' : ''} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formLastName">
                                    <Form.Label style={{ color: 'white', marginBottom: '0.1rem', marginTop: '1.0rem' }}>Last Name</Form.Label>
                                    <Form.Control style={{ height: '35px' }} type="text" placeholder="Enter last name" value={formFields.lastName} onChange={(e) => handleInputChange(e, 'lastName')} className={invalidFields.lastName ? 'invalid-input' : ''} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="formDepartment">
                                    <Form.Label style={{ color: 'white', marginBottom: '0.1rem', marginTop: '1.0rem' }}>Department</Form.Label>
                                    <Form.Control className="custom-select" as="select" value={formFields.department} onChange={(e) => handleInputChange(e, 'department')} className={invalidFields.department ? 'invalid-input custom-select' : 'custom-select'}>
                                        <option className="option" value=""></option>
                                        <option className="option" value="Sales">Sales</option>
                                        <option className="option" value="Marketing">Marketing</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formSexualIdentity">
                                    <Form.Label style={{ color: 'white', marginBottom: '0.1rem', marginTop: '1.0rem' }}>Sexual Identity</Form.Label>
                                    <Form.Control className="custom-select" as="select" value={formFields.sexualIdentity} onChange={(e) => handleInputChange(e, 'sexualIdentity')} className={invalidFields.sexualIdentity ? 'invalid-input custom-select' : 'custom-select'}>
                                        <option className="option" value=""></option>
                                        <option className="option" value="Male">Male</option>
                                        <option className="option" value="Female">Female</option>
                                        <option className="option" value="Prefer not to say">Prefer not to say</option>
                                    </Form.Control>
                                </Form.Group>
                            </Row>
                            <div className="text-left">
                                <Button variant="primary" type="submit" className="mt-3">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default AccessRequestCard;
