import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { UncontrolledAlert } from 'reactstrap';

import { CompanyListPage, FrontPage, NotFoundPage } from './pages';
import { NavigationAppBar } from './components';

import './styles/styles.css';

interface State {
    unhandledPromiseRejections: any;
}

class App extends Component<{}, State> {

    state: State = {
        unhandledPromiseRejections: []
    };

    componentDidMount() {
        window.onunhandledrejection = (err: any) => {
            this.setState((state) => {
                const unhandledPromiseRejections = [ ...state.unhandledPromiseRejections, err.reason ];

                return {
                    unhandledPromiseRejections
                };
            });
        };
    }

    render() {
        const unhandledPromiseRejections = this.state.unhandledPromiseRejections;
        let alerts: any = [];
        unhandledPromiseRejections.map((rejection: any, index: any) => {
            return alerts.push(
                <UncontrolledAlert key={index} color="danger">
                    <h4 className="alert-heading">{rejection.message}</h4>
                    <hr />
                    <p className="mb-0">{rejection.response ? rejection.response.data.message : ''}</p>
                </UncontrolledAlert>
            );
        });

        return (
            <Router>
                <NavigationAppBar />
                <main role="main" className="container">
                    {alerts}
                    <Switch>
                        <Route exact path="/" component={FrontPage} />
                        <Route path="/companies" component={CompanyListPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </main>
            </Router>
        );
    }
}

export default App;
