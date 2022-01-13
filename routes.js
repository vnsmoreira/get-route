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

  router.get('/', (req, res) => {
    res.send('How to use it: <a href="https://github.com/vnsmoreira/api-get-distance">API Documentation</a>');
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
})();

module.exports = router;
