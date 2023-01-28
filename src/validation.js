const isCEP = value => {
  if (!(typeof value == 'string')) return false;

  const cep = value.replace('-', '');

  if (cep.length !== 8) return false;

  if (isNaN(cep)) return false;

  return true;
};

const isArrayOfCeps = ceps => Array.isArray(ceps) && ceps.every(isCEP);

const isModeValid = mode => {
  const validModes = ['driving', 'walking'];

  return typeof mode == 'string' && validModes.includes(mode);
};

module.exports = { isArrayOfCeps, isModeValid };
