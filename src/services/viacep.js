const axios = require('axios');

const getCepsInfo = async ceps => {
  const getCepInfo = async cep => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const cepInfo = response.data;

    return cepInfo;
  };

  const promisesArray = await Promise.allSettled(ceps.map(getCepInfo));
  const cepsInfo = promisesArray.map(response => response.value);

  return cepsInfo;
};

module.exports = getCepsInfo;
