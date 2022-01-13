const { setRequestInterception } = require('./puppeteer-utils');

const formatDistance = distance => {
  let stringDistance = distance.toString().replace(',', '.');
  let isDistanceInMeters = stringDistance.indexOf(' m') > -1;

  return isDistanceInMeters ? parseFloat(stringDistance) / 1000 : parseFloat(stringDistance);
};

const scrapeDistance = async (page, addresses) => {
  let query = `${addresses.join('/')}`;
  let url = `https://www.google.com/maps/dir/${query}`;

  let distanceSelector = '.xB1mrd-T3iPGc-iSfDt-tUvA6e > div:nth-child(3)';

  try {
    await page.goto(url);
    const distance = await page.$eval(distanceSelector, el => el.innerText);
    page.close();

    return { OK: true, distance: formatDistance(distance) };
  } catch (error) {
    return { OK: false };
  }
};

const getDistance = async ({ page, data: addresses }) => {
  setRequestInterception(page);

  return scrapeDistance(page, addresses);
};

/* 

adicionar funcao de remover espacos e %20 da requisicao

arrumaar documentacao
*/

module.exports = {};
