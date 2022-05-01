const axios = require('axios').default;

const getCepsInfo = async addresses => {
  const getCepInfo = async address => {
    const response = await axios.get(`https://viacep.com.br/ws/${address}/json/`);
    const adressInfo = response.data;

    return adressInfo;
  };

  const promisesArray = await Promise.allSettled(addresses.map(getCepInfo));
  const cepsInfo = promisesArray.map(response => response.value);

  return cepsInfo;
};

module.exports = getCepsInfo;
