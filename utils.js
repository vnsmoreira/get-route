const { setRequestInterception } = require('./puppeteer-utils');

const formatDistance = distance => {
  let stringDistance = distance.toString().replace(',', '.');
  let isDistanceInMeters = stringDistance.indexOf(' m') > -1;

  return isDistanceInMeters ? parseFloat(stringDistance) / 1000 : parseFloat(stringDistance);
};

const mountQuery = (addresses, region) => {
  let query = `${region}+${addresses.join('/')}`;

  return query;
};

const scrapeDistance = async (page, addresses, region) => {
  let travelmode = 'data=!4m2!4m1!3e0';
  let query = mountQuery(addresses, region);
  let url = `https://www.google.com/maps/dir/${query}/${travelmode}`;

  let distanceSelector =
    '#section-directions-trip-0 > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3)';

  try {
    await page.goto(url);

    const distance = await page.$eval(distanceSelector, el => el.innerText);
    page.close();

    return { OK: true, distance: formatDistance(distance) };
  } catch (error) {
    return { OK: false };
  }
};

const getDistance = async ({ page, data }) => {
  setRequestInterception(page); /* do not load images, fonts or style */

  let { addresses, region } = data;
  return scrapeDistance(page, addresses, region);
};

/* 

adicionar funcao de remover espacos e %20 da requisicao

arrumar documentacao
*/

module.exports = { getDistance };
