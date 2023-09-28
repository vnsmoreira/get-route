const axios = require('axios').default;
const { isArrayOfCEPs, isModeValid, isValidIndexes } = require('./validate.js');
const { cleanCeps, getIndicesOf } = require('./utils.js');
const errors = require('./errors.js');

const extractRoute = (data, identifier) => {
  const [, index] = getIndicesOf(`cep ${identifier}`, data, true);

  const rawString = data.substring(index, index + 150).replace(/\\|\//g, '');

  const start = rawString.indexOf('",[') + 2;
  const end = rawString.indexOf(',null,null,null');

  if (!isValidIndexes(start, end)) {
    throw new Error();
  }

  const arrayAsString = `[${rawString.substring(start, end)}]`;
  const routeArray = Function('return ' + arrayAsString)();

  const [[distanceRaw, distance], [timeRaw, time]] = routeArray;

  return { distanceRaw, distance, timeRaw, time };
};

const convertCepsToParameter = cepsArray => {
  const getSingleCepAsParam = cepNumber => 'cep+' + cepNumber;
  const cepsAsParams = cepsArray.map(getSingleCepAsParam).join('/');

  return cepsAsParams;
};

const convertTravelModeToParameter = mode => {
  const travelModes = {
    driving: 'data=!4m2!4m1!3e0',
    walking: 'data=!4m2!4m1!3e2',
  };

  return travelModes[mode];
};

const convertToParams = (cepsArray, travelMode) => {
  const cepsParameter = convertCepsToParameter(cepsArray);
  const travelModeAsParams = convertTravelModeToParameter(travelMode);

  return { ceps: cepsParameter, travelMode: travelModeAsParams };
};

const generateRoute = (ceps, mode) => {
  const params = convertToParams(ceps, mode);
  const identifier = ceps.at(-1);

  return {
    extract: data => extractRoute(data, identifier),
    URL: `https://www.google.com.br/maps/dir/${params.ceps}/${params.travelMode}`,
  };
};

const getRoute = async (ceps, mode = 'driving') => {
  try {
    if (!isArrayOfCEPs(ceps)) {
      throw new Error(errors.invalidCeps);
    }

    if (!isModeValid(mode)) {
      throw new Error(errors.invalidMode);
    }

    const route = generateRoute(cleanCeps(ceps), mode);

    const { data } = await axios.get(route.URL);

    return { ok: true, ...route.extract(data) };
  } catch (error) {
    const isKnownError = Object.values(errors).includes(error.message);

    console.error(isKnownError ? error.message : errors.default);
    return { ok: false };
  }
};

module.exports = getRoute;
