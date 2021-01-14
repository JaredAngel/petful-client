import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1 className="nav-header">
          <Link to="/">Petful</Link>
        </h1>
        <nav>
          <Link to="/adoption" className="adopt-link">
            Adopt
          </Link>
        </nav>
      </div>
    );
  }
}

export default Header;