import React, { Component } from 'react';
import EmployeeList from './pages/EmployeeList';
import EmployeeShow from './pages/EmployeeShow';
import EmployeeCreate from './pages/EmployeeCreate';
import CompanyList from './pages/CompanyList';
import CompanyShow from './pages/CompanyShow';
import CompanyCreate from './pages/CompanyCreate';
import NavigationAppBar from './containers/NavigationAppBar';
import { Route, Switch } from 'react-router-dom';
import NotFound from './pages/NotFound';
import './styles/styles.css';

class App extends Component {
    render() {
        return (
            <div>
                <NavigationAppBar />
                <main role="main" className="container">
                    <Switch>
                        <Route exact path="/employees" component={EmployeeList} />
                        <Route exact path="/employees/create" component={EmployeeCreate} />
                        <Route exact path="/employees/:id" component={EmployeeShow} />
                        <Route exact path="/companies" component={CompanyList} />
                        <Route exact path="/companies/create" component={CompanyCreate} />
                        <Route exact path="/companies/:id" component={CompanyShow} />
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
