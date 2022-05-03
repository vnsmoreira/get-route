const setRequestInterception = async page => {
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (['image', 'stylesheet', 'font','xhr'].indexOf(request.resourceType()) !== -1) {
      request.abort();
    } else {
      request.continue();
    }
  });
};

const formatDistance = distance => {
  let stringDistance = distance.toString().replace(',', '.');
  let isDistanceInMeters = stringDistance.indexOf(' m') > -1;

  return isDistanceInMeters ? parseFloat(stringDistance) / 1000 : parseFloat(stringDistance);
};

const mountQuery = addresses => {
  let templatedAddressesArray = addresses.map(address => `cep brazil ${address}`);
  let query = templatedAddressesArray.join('/');

  return query;
};

const scrapeDistance = async (page, addresses, mode = 'driving') => {
  const travelModes = {
    driving() {
      return {
        travelMode: 'data=!4m2!4m1!3e0',
        distanceSelector:
          '#section-directions-trip-0 > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3)',
      };
    },
    walking() {
      return {
        travelMode: 'data=!4m2!4m1!3e2',
        distanceSelector:
          '#section-directions-trip-0 > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)',
      };
    },
  };

  let { travelMode, distanceSelector } = travelModes[mode]();
  let query = mountQuery(addresses);
  let url = `https://www.google.com/maps/dir/${query}/${travelMode}`;

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

  let { addresses, mode } = data;
  return scrapeDistance(page, addresses, mode);
};

module.exports = { getDistance };
