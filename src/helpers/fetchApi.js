const fetchApi = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    error.message = 'Erro na requisição';
  }
};

export default fetchApi;
