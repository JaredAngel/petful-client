import React, { Component } from 'react';
import PetfulApiService from '../../services/petful-api';

export default class AddForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = e.target;
    PetfulApiService.postPeople({ person: name.value }).then(
      this.props.setLine(name.value)
    );
    this.props.setInLine();
    this.props.setPerson(name.value);
    this.props.toggleCat();
  };
  render() {
    return (
      <div className="add-form">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input className="name-input" name="name"></input>
          <button className="btn" type="submit">
            Add to Line
          </button>
        </form>
      </div>
    );
  }
}
