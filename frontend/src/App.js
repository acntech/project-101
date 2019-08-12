import React from 'react';
import EmployeeListPage from './pages/EmployeeListPage';
import CompanyListPage from './pages/CompanyListPage';
import NavigationAppBar from './components/NavigationAppBar';
import { Route, Switch } from 'react-router-dom';
import NotFound from './pages/NotFound';
import './styles/styles.css';
import FrontPage from './pages/FrontPage';

function App() {
    return (
        <div>
            <NavigationAppBar />
            <main role="main" className="container">
                <Switch>
                    <Route exact path="/" component={FrontPage} />
                    <Route path="/employees" component={EmployeeListPage} />
                    <Route path="/companies" component={CompanyListPage} />
                    <Route component={NotFound} />
                </Switch>
            </main>
        </div>
    );
}

export default App;
