import axios from 'axios';

const AUTH_TOKEN = '35646558-4fb195c270d7d7b6dafa6281b';

axios.defaults.baseURL = `https://pixabay.com/api/`;
axios.defaults.params = {
  key: AUTH_TOKEN,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = async (query, page) => {
  const images = await axios.get(`?q=${query}&page=${page}`);
  return images;
};
