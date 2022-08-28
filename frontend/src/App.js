import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UncontrolledAlert } from 'reactstrap';
import NavigationAppBar from './components/NavigationAppBar';
import CompanyListPage from './pages/CompanyListPage';
import EmployeeListPage from './pages/EmployeeListPage';
import FrontPage from './pages/FrontPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/styles.css';

const App = () => {
    const [unhandledPromiseRejections, setUnhandledPromiseRejections] = React.useState([]);

    React.useEffect(() => {
        window.onunhandledrejection = (err) => {
            setUnhandledPromiseRejections(currentUnhandledPromiseRejections => [...currentUnhandledPromiseRejections, err.reason]);
        }
    }, []);

    return (
        <>
            <NavigationAppBar />
            <main role="main" className="container">
                {unhandledPromiseRejections.map((rejection, index) => <Alert rejection={rejection} id={index} />)}
                <Routes>
                    <Route exact path="/" element={<FrontPage/>} />
                    <Route path="/employees" element={<EmployeeListPage/>} />
                    <Route path="/companies" element={<CompanyListPage/>} />
                    <Route element={<NotFoundPage/>} />
                </Routes>
            </main>
        </>
    );
}

const Alert = ({rejection, id}) => {
    return (
        <UncontrolledAlert key={id} color="danger">
            <h4 className="alert-heading">{rejection.message}</h4>
            <hr />
            <p className="mb-0">{rejection.response ? rejection.response.data.message : ''}</p>
        </UncontrolledAlert>
    );
}

export default App;
