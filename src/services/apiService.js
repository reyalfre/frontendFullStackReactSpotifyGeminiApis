import axios from 'axios';

export const fetchGenres = async () => {
  const response = await axios.get('/api/genres');
  return response.data;
};

export const fetchArtistsByGenre = async (genre) => {
  const response = await axios.get(`/api/artists/${genre}`);
  return response.data;
};

export const fetchChatHistory = async (artistId) => {
  const response = await axios.get(`/api/chat/${artistId}`);
  return response.data;
};

export const sendChatMessage = async (artistId, message) => {
  const response = await axios.post(`/api/chat/${artistId}`, { message });
  return response.data;
};
