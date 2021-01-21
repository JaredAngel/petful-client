import React, { Component } from 'react';
import AddForm from '../AddForm/AddForm';

export default class People extends Component {
  renderLine = () => {
    return this.props.line.map((ind,i) => <li key={btoa(ind + i)}>{ind}</li>);
  };
  render() {
    return (
      <div className="people-container">
        <h1>People waiting to Adopt:</h1>
        <ul>{this.renderLine()} </ul>
        {!this.props.inLine && (
          <AddForm
            setInLine={this.props.setInLine}
            setPerson={this.props.setPerson}
            setLine={this.props.setLine}
            toggleCat={this.props.toggleCat}
          />
        )}
      </div>
    );
  }
}
