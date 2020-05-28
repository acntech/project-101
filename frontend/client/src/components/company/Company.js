import React, {Component} from 'react';
import AddCompany from './AddCompany';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {FaPlus} from "react-icons/fa";


export default class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: [],
            showForm: false,
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/companies")
            .then(response => {
                response.json().then(data => {
                    this.setState({company: data});
                })
            })
    }

    render() {
        const showForm = this.state.showForm;
        return (
            <Container className='mt-5'>

                {showForm && (
                    <Row className="addCompany">
                        <AddCompany/>
                    </Row>
                )}
                <Row className='ml-2'>
                    <Button variant="primary" onClick={() => this.setState({showForm: !this.state.showForm})}><FaPlus/> New Company</Button>
                </Row>

                <Table striped bordered hover className='mt-2'>
                    <thead>
                    <tr>
                        <th>#id</th>
                        <th>Company Name</th>
                        <th>Organization Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.company.map((item) => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.companyName}</td>
                            <td>{item.orgNr}</td>
                        </tr>
                    ))}

                    </tbody>
                </Table>

            </Container>
        )
    }
}