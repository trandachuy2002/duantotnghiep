import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className="site-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <span className="icon-check_circle display-3 text-success"></span>
            <img style={ { magin: '0 auto' } } src="https://stories.freepiklabs.com/storage/26832/oops-404-error-with-a-broken-robot-rafiki-2849.png" alt="" />

            <p>
              <Link to="/" className="btn btn-sm btn-primary">
                Trở lại Shop
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;