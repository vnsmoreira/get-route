const getIndicesOf = (searchStr, str, caseSensitive) => {
  let searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
    return [];
  }
  let startIndex = 0,
    index,
    indices = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
};

const cleanCeps = ceps => ceps.map(cep => cep.replace('-', ''));

module.exports = { getIndicesOf, cleanCeps };
