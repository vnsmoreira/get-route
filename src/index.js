const axios = require('axios').default;
const { getIndicesOf, isValidIndexes } = require('./utils.js');

const extractRoute = (data) => {
  const [, addressesStart, , routeStart] = getIndicesOf('*,*', data, true);

  const routeEnd = data.indexOf(',null', routeStart);

  if (!isValidIndexes(routeStart, routeEnd)) {
    throw new Error();
  }

  const addressRawString = data.substring(addressesStart, routeStart);
  const [originStart, destinationStart] = getIndicesOf(`\\"],\\"`, addressRawString, true);

  const originEnd = addressRawString.substring(originStart).indexOf('",');
  const origin = addressRawString.substr(originStart + 6, originEnd - 6).replace(/\\|\//g, '');

  const destinationEnd = addressRawString.substring(destinationStart).indexOf('",');
  const destination = addressRawString.substr(destinationStart + 6, destinationEnd - 6).replace(/\\|\//g, '');

  const rawString = data.substring(routeStart, routeEnd).replace(/\\|\//g, '');

  const reversedString = rawString.split('').reverse().join('');
  const [, accurateStart] = getIndicesOf('[', reversedString, true);

  const informationArray = JSON.parse(`[${rawString.substr(-accurateStart - 1)}]`);
  const [[distanceRaw, distance], [timeRaw, time]] = informationArray;

  return { distanceRaw, distance, timeRaw, time, origin, destination };
};

const routeURL = (addresses) => {
  const addressesAsParams = addresses
    .map((address) => '*,*' + address)
    .join('/')
    .replaceAll(' ', '+');

  return `https://www.google.com.br/maps/dir/${addressesAsParams}/data=!4m2!4m1!3e0`;
};

const getRoute = async (origin, destination) => {
  try {
    const routeUrl = routeURL([origin, destination]);

    const { data } = await axios.get(routeUrl);

    return { ok: true, ...extractRoute(data) };
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
};

module.exports = getRoute;
