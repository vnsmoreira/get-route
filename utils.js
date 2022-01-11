const formatDistance = distance => {
  let stringDistance = distance.toString().replace(',', '.');
  let isDistanceInMeters = stringDistance.indexOf(' m') > -1;

  return isDistanceInMeters ? parseFloat(stringDistance) / 1000 : parseFloat(stringDistance);
};

const getDistance = async (page, origin, destination) => {
  let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
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

module.exports = { getDistance };
