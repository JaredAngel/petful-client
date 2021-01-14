import React, { Component } from 'react';
import AddForm from '../AddForm/AddForm';

class People extends Component {
  renderQueue = () => {
    return this.props.queue
      .map((ind,i) => <li key={btoa(ind + i)}>{ind}</li>);
  };
  render() {
    return (
      <div className="people-container">
        <h1>People queued to adopt:</h1>
        <ul>{this.renderQueue()} </ul>
        {!this.props.inQueue && (
          <AddForm
            setInQueue={this.props.setInQueue}
            setPerson={this.props.setPerson}
            setQueue={this.props.setQueue}
            toggleCat={this.props.toggleCat}
          />
        )}
      </div>
    );
  }
}

export default People;