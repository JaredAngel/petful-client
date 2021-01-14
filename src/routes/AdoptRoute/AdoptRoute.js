import React, { Component } from 'react';
import List from '../../components/List/List';
import People from '../../components/People/People';
import PetfulApiService from '../../services/petful-api';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Adoption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cat: {},
      dog: {},
      queue: [],
      inQueue: false,
      adopt: false,
      person: '',
      nextInQueue: null,
      dequeueCat: false,
      dequeueDog: false,
      show: false,
      error: null,
    };

    this.timer = null;
  }

  componentDidMount() {
    this.getNextCat();
    this.getNextDog();
    PetfulApiService.getPeople()
      .then((res) => {
        this.setState({
          line: res
        });
      });
    PetfulApiService.getNextPerson()
      .then((res) => this.setState({
        nextInLine: res
      }))
      .catch((res) => this.setState({
        error: res
      }));
  }

  componentDidUpdate(prevState) {
    if(this.state.line[0] !== this.state.person) {
      if(this.timer === null && this.state.inLine === true) {
        this.timer = setInterval(() => {
          this.handlePetQueue();
          this.handleLineGeneration(this.state.nextInLine);
        }, 6000);
      }
    }
    if(this.state.line[0] === this.state.person && this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
      if(prevState.adopt !== true) {
        this.toggleAdopt();
      }
    }
  }

  getNextCat = () => {
    return PetfulApiService.getCats()
      .then((res) => {
        this.setState({
          cat: res
        });
      });
  };

  getNextDog = () => {
    return PetfulApiService.getDogs()
      .then((res) => {
        this.setState({
          dog: res
        });
      });
  };

  setAdopt = () => {
    this.state.nextInQueue === this.state.person &&
      this.setState({
        adopt: true
      });
  };

  toggleAdopt = () => {
    this.setState({
      adopt: !this.state.adopt
    });
  };

  setQueue = (person) => {
    this.setState({
      queue: [...this.state.queue, person]
    });
  };

  setInQueue = () => {
    this.setState({
      inQueue: !this.state.inQueue
    });
  };

  getAndSetQueue = (res) => {
    this.setState({
      queue: res
    });
  };

  toggleCat = () => {
    this.setState({
      dequeueCat: !this.state.dequeueCat
    });
  };

  toggleDog =() => {
    this.setState({
      dequeueDog: !this.state.dequeueDog
    });
  };

  setPerson = (name) => {
    this.setState({
      person: name
    });
  };

  handlePetQueue = () => {
    if(this.state.dequeueCat) {
      PetfulApiService.dequeueCats()
        .then(() => {
          PetfulApiService.getCats()
            .then((res) => {
              this.setState({
                cat: res
              });
              PetfulApiService.getNextPerson()
                .then((res) => {
                  this.setState({
                    nextInQueue: res
                  });
                })
              this.toggleCat();
              this.toggleDog();
            })
            .catch((res) => {
              this.setState({
                cat: res
              });
              this.toggleCat();
              this.toggleDog();
            });
        });
    } else if(this.state.dequeueDog) {
      PetfulApiService.dequeueDogs()
        .then(() => {
          PetfulApiService.getDogs()
            .then((res) => {
              this.setState({
                dog: res
              });
              PetfulApiService.getNextPerson()
                .then((res) => {
                  this.setState({
                    nextInQueue: res
                  });
                })
              this.toggleCat();
              this.toggleDog();
            })
            .catch((res) => {
              this.setState({
                cat: res
              });
              this.toggleCat();
              this.toggleDog();
            });
        });
    }
  };

  handleQueueGeneration = (name) => {
    PetfulApiService.postPerson({
      person: name
    })
      .then(() => {
        PetfulApiService.getPerson()
          .then((res) => {
            this.setState({
              queue: res
            });
          });
      })
  };

  handleShow = () => {
    this.setState({
      show: true
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
      dequeueCat: false,
      dequeueDog: false
    });
  };

  renderAdopt = () => {
    return (
      <div>
        {this.state.adopt === true && (
          <h2>It's your turn now! Ready to meet your new best friend?</h2>
        )}
      </div>
    );
  };
  render() {
    return (
      <div className="adoption-container">
        <h1>Adoption</h1>
        <List
          toggleAdopt={this.toggleAdopt}
          getNextCat={this.getNextCat}
          getNextDog={this.getNextDog}
          adopt={this.state.adopt}
          cat={this.state.cat}
          dog={this.state.dog}
          setInQueue={this.setInQueue}
          handleShow={this.handleShow}
          setQueue={this.getAndSetQueue}
        />
        {this.renderAdopt()}
        <People
          queue={this.state.queue}
          inQueue={this.state.inQueue}
          setInQueue={this.setInQueue}
          setPerson={this.setPerson}
          toggleCat={this.toggleCat}
          setQueue={this.setQueue}
        />



        <div className="popup-container">
          <Modal
            className="popup"
            show={this.state.show}
            onHide={this.handleClose}
          >
            <Modal.Header>
              <Modal.Title>Congratulations!</Modal.Title>
            </Modal.Header>
            <Modal.Body>You just adopted a friend!</Modal.Body>
            <Modal.Footer>
              <Button
                className="btn"
                variant="primary"
                onClick={this.handleClose}
              >
                Thanks!
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Adoption;