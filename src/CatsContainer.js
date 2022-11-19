import React, {useEffect, useState, useCallback} from 'react';
import Select from 'react-select'
import CatsGrid from './CatsGrid.js';

const catsContainer = {
  display: 'flex',
  flexDirection: 'column'
}
const options = [
  { value: 'pusa', label: 'Pusa' },
  { value: 'pusa2', label: 'Pusa2' },
  { value: 'pusa3', label: 'Pusa3' }
]

const buttonStyling = {
  color: '#fff',
    backgroundColor: '#28a745',
    borderColor: '#28a745'
}

export default function CatContainer() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const handleLoadBreeds = useCallback(async () => {
    let result = [];
    const response = 
    await fetch(' https://api.thecatapi.com/v1/breeds')
    .then(response => response.json())
    .then(response => {
      response.map(rs => {
        result.push({value: rs.id, label:rs.name })
      });
      setBreeds(result);
    }); 
  }, [setBreeds]);

  useEffect(() => {
    handleLoadBreeds();
  },[handleLoadBreeds]);
  return (
    <div className="CatsContainer" style={catsContainer}>
      <h1 className="CatTitle">Cat Browser</h1>
      <form>
      <label className="BreedTitle" >Breed</label>
        <Select options={breeds} onChange={setSelectedBreed}/>
      </form>
      <CatsGrid breed={selectedBreed}/>
      <button style={buttonStyling} >Load More</button>
    </div>
  );
}

