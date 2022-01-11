const express = require('express');
const router = express.Router();
const { Cluster } = require('puppeteer-cluster');
const { getDistance } = require('./utils');
const { puppeteerOptions, setRequestInterception } = require('./puppeteer-utils');

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 4,
    puppeteerOptions,
  });

  await cluster.task(async ({ page, data }) => {
    setRequestInterception(page);

    let { origin, destination } = data;
    return getDistance(page, origin, destination);
  });

  router.get('/:origin/:destination', async (req, res) => {
    try {
      let { origin, destination } = req.params;
      let response = await cluster.execute({ origin, destination });

      res.send(response);
    } catch (err) {
      res.send({ distance: `${err}` });
    }
  });

  /* keep puppeteer awake */
  setInterval(async () => {
    await cluster.execute({
      origin: 'Rua Muzambinho. 04338000',
      destination: 'Rolando Curti',
    });
  }, 2000);
})();

module.exports = router;
