import Amadeus from 'amadeus';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

// Set the necessary environment variables from the .env file
const amadeusClientId = process.env.AMADEUS_API_KEY;
const amadeusClientSecret = process.env.AMADEUS_API_SECRET;

async function getAccessToken() {
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  data.append('client_id', amadeusClientId);
  data.append('client_secret', amadeusClientSecret);

  const options = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  };

  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      data,
      options
    );
    return response.data.access_token;
  } catch (err) {
    console.error('An error occurred while obtaining the access token:', err);
    throw err;
  }
}

// Define the searchFlights function
export async function searchFlights(params) {
  try {
    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(
      'https://test.api.amadeus.com/v2/shopping/flight-offers',
      {
        headers: headers,
        params: params,
      }
    );

    return response.data;
  } catch (err) {
    console.error('Error occurred:', err);
  }
}

