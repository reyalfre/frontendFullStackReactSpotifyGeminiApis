const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Spotify API credentials
const SPOTIFY_CLIENT_ID = '0e4af79556d24ce1834d348e383c02d0';
const SPOTIFY_CLIENT_SECRET = 'b7368bce20f5441cbf76f472e8ecbc0c';

// Endpoint to fetch Spotify genres
app.get('/api/genres', async (req, res) => {
  try {
    // Authenticate with Spotify
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // Fetch genres from Spotify
    const genresResponse = await axios.get('https://api.spotify.com/v1/browse/categories', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Respond with the genres
    res.json(genresResponse.data.categories.items);
  } catch (error) {
    console.error('Error fetching genres:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
