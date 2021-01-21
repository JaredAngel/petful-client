import React, { Component } from 'react';
import PetList from '../../components/PetList/PetList';
import People from '../../components/People/People';
import PetfulApiService from '../../services/petful-api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default class Adoption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: {},
      dog: {},
      line: [],
      inLine: false,
      adopt: false,
      person: '',
      nextInLine: null,
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
        this.setState({ line: res });
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
    if (this.state.line[0] !== this.state.person) {
      if (this.timer === null && this.state.inLine === true) {
        this.timer = setInterval(() => {
          this.handlePetQueue();
          this.handleLineGeneration(this.state.nextInLine);
        }, 7000);
      }
    }
    if (this.state.line[0] === this.state.person && this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
      if (prevState.adopt !== true) {
        this.toggleAdopt();
      }
    }
  }
  getNextCat = () => {
    return PetfulApiService.getCats().then((res) => {
      this.setState({ 
        cat: res 
      });
    });
  };
  getNextDog = () => {
    return PetfulApiService.getDogs().then((res) =>
      this.setState({ 
        dog: res 
      })
    );
  };
  setAdopt = () => {
    this.state.nextInLine === this.state.person &&
      this.setState({ 
        adopt: true 
      });
  };
  toggleAdopt = () => {
    this.setState({ 
      adopt: !this.state.adopt 
    });
  };
  setLine = (person) => {
    this.setState({ 
      line: [...this.state.line, person] 
    });
  };
  setInLine = () => {
    this.setState({ 
      inLine: !this.state.inLine 
    });
  };
  getAndSetLine = (res) => {
    this.setState({ 
      line: res 
    });
  };
  toggleCat = () => {
    this.setState({ 
      dequeueCat: !this.state.dequeueCat 
    });
  };
  toggleDog = () => {
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
    if (this.state.dequeueCat === true) {
      PetfulApiService.dequeueCats()
        .then(() => {
          PetfulApiService.getCats()
            .then((res) => {
              this.setState({ 
                cat: res 
              });
              PetfulApiService.getNextPerson()
                .then((res) =>
                  this.setState({ 
                    nextInLine: res 
                  })
                );
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
    } else if (this.state.dequeueDog === true) {
      PetfulApiService.dequeueDogs()
        .then(() => {
          PetfulApiService.getDogs()
            .then((res) => {
              this.setState({ 
                dog: res 
              });
              PetfulApiService.getNextPerson()
                .then((res) =>
                  this.setState({ 
                    nextInLine: res 
                  })
                );
              this.toggleCat();
              this.toggleDog();
            })
            .catch((res) => {
              this.setState({ 
                dog: res 
              });
              this.toggleCat();
              this.toggleDog();
            });
        });
    }
  };
  handleLineGeneration = (name) => {
    PetfulApiService.postPeople({ 
      person: name 
    })
      .then(() => {
        PetfulApiService.getPeople()
          .then((res) => this.setState({ 
            line: res 
          }));
      });
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
          <h2>It's your turn! Time to meet your new best friend!</h2>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="adoption-container">
        <h1>Adoption</h1>
        <PetList
          toggleAdopt={this.toggleAdopt}
          getNextCat={this.getNextCat}
          getNextDog={this.getNextDog}
          adopt={this.state.adopt}
          cat={this.state.cat}
          dog={this.state.dog}
          setInLine={this.setInLine}
          handleShow={this.handleShow}
          setLine={this.getAndSetLine}
        />
        {this.renderAdopt()}
        <People
          line={this.state.line}
          inLine={this.state.inLine}
          setInLine={this.setInLine}
          setPerson={this.setPerson}
          toggleCat={this.toggleCat}
          setLine={this.setLine}
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
            <Modal.Body>Your family just got bigger!</Modal.Body>
            <Modal.Footer>
              <Button
                className="btn"
                variant="primary"
                onClick={this.handleClose}
              >
                Thank you!
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}