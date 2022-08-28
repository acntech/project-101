import {Input} from 'reactstrap';
import React from "react";

export const CompaniesSelectOptions = (props) => {
    return (
        <Input type="select" value={props.defaultCompanyId} name="companyId" id="companySelect" onChange={props.handleChange}>
            <option key="-1" value="">Select company</option>
            {props.companies.map((company) => <option key={company.id} value={company.id}>{company.companyName}</option>)}
        </Input>
    );
};