import axios from 'axios';

const API_KEY = '55714880-b78f37b6e8e6ea7569ba17e8f';

const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 12,
    },
  });

  return response.data;
};