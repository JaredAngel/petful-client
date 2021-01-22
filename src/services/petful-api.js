import config from '../config';

const PetfulApiService = {
  getCats() {
    return fetch(`${config.REACT_APP_API_BASE}/pets/cats/next`)
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getDogs() {
    return fetch(`${config.REACT_APP_API_BASE}/pets/dogs/next`)
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getPeople() {
    return fetch(`${config.REACT_APP_API_BASE}/people`)
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postPeople(person) {
    return fetch(`${config.REACT_APP_API_BASE}/people`, {
      method: 'POST',
      headers: { 
        'content-type': 'application/json' 
      },
      body: JSON.stringify(person),
    });
  },
  getNextPerson() {
    return fetch(`${config.REACT_APP_API_BASE}/people/next`)
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  dequeueCats() {
    return fetch(`${config.REACT_APP_API_BASE}/pets/cats/next`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
  },
  dequeueDogs() {
    return fetch(`${config.REACT_APP_API_BASE}/pets/dogs/next`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
  },
};
export default PetfulApiService;
