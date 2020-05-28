import React, { Component } from "react";
import { Router } from "@reach/router";
import NavComp from "./components/NavComp";
import Company from "./components/company/Company";
import Employee from "./components/employee/Employee";
import AddEmployee from "./components/employee/AddEmployee";
import History from "./components/History"

class App extends Component {
    render() {
        return (
            <div>
                <NavComp />
                <Router history={History}>
                    <Company path="companies" />
                    <Employee path="employees" />
                    <AddEmployee path="add-employee" />
                </Router>
            </div>
        );
    }
}

export default App;