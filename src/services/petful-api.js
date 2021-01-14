import config from '../config';

const PetfulApiService = {
  getCats() {
    return fetch(`${config.API_ENDPOINT}/pets/cats/next`)
      .then((res) => {
        if(!res.ok) {
          res
            .json()
            .then((e) => {
              Promise.reject(e)
            })
        } else {
          res.json()
        }
      })
  },
  getDogs() {
    return fetch(`${config.API_ENDPOINT}/pets/dogs/next`)
      .then((res) => {
        if(!res.ok) {
          res
            .json()
            .then((e) => {
              Promise.reject(e)
            })
        } else {
          res.json()
        }
      })
  },
  getPerson() {
    return fetch(`${config.API_ENDPOINT}/people`)
      .then((res) => {
        if(!res.ok) {
          res
            .json()
            .then((e) => {
              Promise.reject(e)
            })
        } else {
          res.json()
        }
      })
  },
  postPerson(person) {
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(person),
    });
  },
  getNextPerson() {
    return fetch(`${config.API_ENDPOINT}/people/next`)
    .then((res) => {
      if(!res.ok) {
        res
          .json()
          .then((e) => {
            Promise.reject(e)
          })
      } else {
        res.json()
      }
    })
  },
  dequeueCats() {
    return fetch(`${config.API_ENDPOINT}/pets/cats/next`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
  },
  dequeueDogs() {
    return fetch(`${config.API_ENDPOINT}/pets/dogs/next`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
  },
};

export default PetfulApiService;