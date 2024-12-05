import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArtistsByGenre } from '../services/apiService';

const ArtistDisplayPage = () => {
  const { genre } = useParams();
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const getArtists = async () => {
      const data = await fetchArtistsByGenre(genre);
      setArtists(data);
    };

    getArtists();
  }, [genre]);

  return (
    <div>
      <h1>Artists for {genre}</h1>
      <div className="artist-grid">
        {artists.map((artist) => (
          <Link key={artist.id} to={`/chat/${artist.id}`}>
            <div className="artist-card">
              <img src={artist.image} alt={artist.name} />
              <h3>{artist.name}</h3>
              <p>Followers: {artist.followers}</p>
              <p>Popularity: {artist.popularity}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtistDisplayPage;
