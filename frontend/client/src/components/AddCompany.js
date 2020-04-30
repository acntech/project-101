import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

export default class AddCompany extends Component {

    SubmitCompany(event) {
        event.preventDefault();
        let company = {
            companyName: this.refs.companyName.value,
            orgNr: this.refs.orgNr.value
        }

        fetch("http://localhost:8080/companies", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(company),
        })
            .then(response => response.json())
        window.location.reload();
    }


    render() {
        return (
            <Container>

                <Card className='mt-3 mb-3'>
                    <Card.Body >
                        <Card.Title>Add a new company </Card.Title>
                        <Form onSubmit={this.SubmitCompany.bind(this)} className='mt-3 mb-3'>
                            <Row>
                                <Col>
                                    <Form.Group controlId="companyName">
                                        <Form.Label htmlFor="companyName">Company Name</Form.Label>
                                        <Form.Control type="string" placeholder="Enter Company Name" size="sm"
                                                      ref="companyName"/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="orgNr">
                                        <Form.Label htmlFor="orgNr">Org Nr</Form.Label>
                                        <Form.Control type="string" placeholder="Enter Organization Nr" size="sm"
                                                      ref="orgNr"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}