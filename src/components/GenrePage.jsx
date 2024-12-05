import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchGenres } from '../services/apiService';

const GenrePage = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      const data = await fetchGenres();
      setGenres(data);
    };

    getGenres();
  }, []);

  return (
    <div>
      <h1>Genres</h1>
      <div className="genre-grid">
        {genres.map((genre) => (
          <Link key={genre.id} to={`/artists/${genre.name}`}>
            <div className="genre-card">{genre.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
