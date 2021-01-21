import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Hompage extends Component {
  render() {
    return (
      <div className="Homepage">
        <div className="page-container">
          <h1 className="welcome">Welcome to Petful's Adoption Service</h1>
          <div className="process-container">
            <h2>How the Adoption Process Works:</h2>
            <p>
              If you are interested in adopting one of our amazing animals there are a few things to know.
              Your name must be added to the list of those looking to adopt. 
              Please note while you may view all of our companions, you will only be able to select those ready for immediate adoption.
              We are a fair Adoption service and believe all pets should be given the chance at a happily ever after.
            </p>
            <h3>
              Interested in bringing home a new family member? 
              <br />
              Click{' '}
              <Link className="adopt" to="/adoption">
                Adopt
              </Link>{' '}
              to begin the process!
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
