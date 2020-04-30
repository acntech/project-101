import React, { Component } from "react";
import { Router } from "@reach/router";
import NavComp from "./components/NavComp";
import CompanyList from "./components/CompanyList";

class App extends Component {
    render() {
        return (
            <div>
                <NavComp />
                <Router>
                    <CompanyList path="companies" />
                </Router>
            </div>
        );
    }
}

export default App;