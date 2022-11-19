import React, {useEffect, useState, useCallback} from 'react';
import { Gallery } from "react-grid-gallery";

export default function CatsGrid({breed}) {
    const [cats, setCats] = useState([]); 
    const handleLoadCats = useCallback(async ({value}) => {
    let result = [];
    const response = 
    await fetch('https://api.thecatapi.com/v1/images/search?page=1&limit=10&breed_id='+value)
    .then(response => response.json())
    .then(response => {
        response.map(rs => {

            result.push({src: rs.url})
        });
      setCats(result);
    }); 
  }, []);

  useEffect(() => {
    handleLoadCats(breed);
  },[handleLoadCats, breed]);
  return (
    <div className="CatsGrid">
        <Gallery images={cats}/>
    </div>
  );
}

