import React, { Component } from 'react';
import PetfulApiService from '../../services/petful-api';
import Pet from '../Pets/Pets';

class PetList extends Component {
  renderError = () => {
    return <h1>All out of pets! (This is a great thing!)</h1>;
  };

  render() {
    return (
      <div className="pet-list">
        {this.props.cat.message ? (
          <div className="error">{this.renderError()}</div>
        ) : (
          <Pet
            title="Cat"
            key="Cat"
            toggleAdopt={this.props.toggleAdopt}
            dequeue={PetfulApiService.dequeueCats}
            adopt={this.props.adopt}
            pet={this.props.cat}
            getNextPet={this.props.getNextCat}
            handleShow={this.props.handleShow}
            setInQueue={this.props.setInQueue}
            setQueue={this.props.setQueue}
          />
        )}

        {this.props.dog.message ? (
          <div className="error">{this.renderError()}</div>
        ) : (
          <Pet
            title="Dog"
            key="Dog"
            toggleAdopt={this.props.toggleAdopt}
            dequeue={PetfulApiService.dequeueDogs}
            adopt={this.props.adopt}
            pet={this.props.dog}
            getNextPet={this.props.getNextDog}
            handleShow={this.props.handleShow}
            setInQueue={this.props.setInQueue}
            setQueue={this.props.setQueue}
          />
        )}
      </div>
    );
  }
}

export default PetList;
