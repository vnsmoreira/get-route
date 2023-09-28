const isString = value => typeof value == 'string';
const isArray = value => Array.isArray(value);
/*  */
const isCEP = value => isString(value) && value.replace('-', '').length == 8;

const isValidIndexes = (start, end) => start > -1 && end > -1;

const isArrayOfCEPs = value => isArray(value) && value.every(isCEP);

const isModeValid = mode => {
  const validModes = ['driving', 'walking'];

  return isString(mode) && validModes.includes(mode);
};

module.exports = { isValidIndexes, isArrayOfCEPs, isModeValid };
