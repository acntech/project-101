import React  from 'react';

const Company = ({item}) => (
    <div className="row">
        <div className="col s12 m6">
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Company : {item.id}</span>

                </div>
                <div className="card-action">
                    <a href="#">{item.companyName}</a>
                    <a href="#">{item.orgNr}</a>
                </div>
            </div>
        </div>
    </div>

)

export default Company;