import React, { Component } from 'react';
import Dog from './Dog';
import { DOGS } from '../App';

class DogList extends Component {

  render() {
    
    return (
      <div id="dog-list">
      {
        DOGS.map(dog => (
          <div key={dog.id}>
            <Dog
            to={"/dog/" + dog.id}
            name={dog.name}
            breed={dog.breed}
            description={dog.description}
            image= {dog.image}
            />
          </div>
        ))
      }
      </div>
    );
  }
}

export default DogList;
