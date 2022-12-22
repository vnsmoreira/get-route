/* import cache from '#cache'; */
import scraper from '#puppeteer';
import { getCepsInfo } from '#services/viacep';

const getDistanceResponse = async ({ addresses, mode }) => {
  const promisesArray = await Promise.allSettled([scraper.getDistanceInKm(addresses, mode), getCepsInfo(addresses)]);

  const [{ OK, distance }, cepsInfo] = promisesArray.map(promise => promise.value);

  return OK && cepsInfo ? { distance, cepsInfo } : null;
};

const distanceController = async (req, res) => {
  try {
    const distanceResponse = await getDistanceResponse(req.routeParameters);

    if (!distanceResponse) {
      return res.status(400).send({ error: 'Could not retrieve the distance. Be sure to check the postcodes.' });
    }

    res.send(distanceResponse);

    /* return cache.set(req.routeKey, distanceResponse, 86400); */
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Error getting distance' });
  }
};

export default distanceController;
