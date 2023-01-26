import React from 'react'
import ScrollToTop from '../utility/ScrollToTop'


const NotFound = () => {
  return (
    <div>
      <ScrollToTop />
      <div className="notfoundImageContainer">
        <img
          className="notFoundImage"
          src="/images/404.jpg"
          alt="Page not found" />
      </div>
    </div>
  );
};

export default NotFound