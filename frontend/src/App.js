import React, {Component} from 'react';
import EmployeeListPage from './pages/EmployeeListPage';
import CompanyListPage from './pages/CompanyListPage';
import NavigationAppBar from './components/NavigationAppBar';
import {Route, Switch} from 'react-router-dom';
import NotFound from './pages/NotFound';
import './styles/styles.css';

class App extends Component {
    render() {
        return (
            <div>
                <NavigationAppBar/>
                <main role="main" className="container">
                    <Switch>
                        <Route path="/employees" component={EmployeeListPage}/>
                        <Route path="/companies" component={CompanyListPage}/>
                        <Route component={NotFound}/>
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
