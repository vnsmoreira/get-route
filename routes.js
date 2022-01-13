const express = require('express');
const router = express.Router();
const getCluster = require('./puppeteer-config');

(async () => {
  const cluster = await getCluster();

  router.get('/', (req, res) => {
    res.send(
      `<h1>How to use it: <a href="https://github.com/vnsmoreira/api-get-distance">API Documentation</a></h1>`
    );
  });

  router.post('/', async (req, res) => {
    try {
      let { addresses, region } = req.body;

      let response = await cluster.execute({ addresses, region });

      res.send(response);
    } catch (err) {
      res.send({ distance: `${err}` });
    }
  });

  router.get('/:origin/:destination/:region', async (req, res) => {
    try {
      let params = Object.values(req.params);
      let region = params.slice(2);
      let addresses = params.slice(0, 2);

      let response = await cluster.execute({ addresses, region });

      res.send(response);
    } catch (err) {
      res.send({ distance: `${err}` });
    }
  });
})();

module.exports = router;
