import React, { Component } from 'react';
import PetfulApiService from '../../services/petful-api';

export default class Pet extends Component {
  state = {
    pet: {},
  };

  dequeueAndGetNext = () => {
    this.props
      .dequeue()
      .then(this.props.getNextPet)
      .then(() => {
        PetfulApiService.getPeople().then((res) => {
          this.props.setLine(res);
        });
      })
      .then(() => {
        this.props.handleShow();
        this.props.toggleAdopt();
        this.props.setInLine();
      });
  };

  renderAdoptButton = () => {
    return (
      this.props.adopt && (
        <button className="btn" onClick={() => this.dequeueAndGetNext()}>
          Adopt Me!
        </button>
      )
    );
  };

  render() {
    const {
      age,
      breed,
      description,
      gender,
      imageURL,
      name,
      story,
    } = this.props.pet;
    return (
      <div className="pet-container">
        <h1>{this.props.title}</h1>

        <img className="pet-img" src={imageURL} alt="pet"></img>
        <div className="pet-details-container">
          <h2>{name}</h2>
          <ul className="pet-details">
            <li>Breed: {breed} </li> <li>Gender: {gender}</li>{' '}
            <li>Age: {age}</li>
            <li>Story: {story}</li>
            <li>Description: {description}</li>
          </ul>
          {this.renderAdoptButton()}
        </div>
      </div>
    );
  }
}
// // "age": 3,
// "breed": "Golden Retriever",
// "description": "A smiling golden-brown golden retreiver listening to music.",
// "gender": "Male",
// "imageURL": "https://images.pexels.com/photos/33053/dog-young-dog-small-dog-maltese.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
// "name": "Zim",
// "story": "Owner Passed away"
