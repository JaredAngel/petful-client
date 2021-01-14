import React, { Component } from 'react';
import PetfulApiService from '../../services/petful-api';

class AddForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = e.target;

    PetfulApiService.postPerson({
      person: name.value
    })
      .then(
        this.props.setQueue(name.value)
      );
    this.props.setInQueue();
    this.props.setPerson(name.value);
    this.props.toggleCat();
  };
  render() {
    return (
      <div className="add-form">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input className="name-input" name="name"></input>
          <button className="btn" type="submit">
            Add to Queue
          </button>
        </form>
      </div>
    );
  }
}

export default AddForm;