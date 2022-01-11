const express = require('express');
const router = express.Router();
const { Cluster } = require('puppeteer-cluster');

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 4,
    puppeteerOptions: {
      args: [
        '--no-sandbox',
        '--devtools=false',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
      headless: true,
    },
  });

  const formatDistance = distance => {
    let stringDistance = distance.toString().replace(',', '.');
    let isDistanceInMeters = stringDistance.indexOf(' m') > -1;

    return isDistanceInMeters ? parseFloat(stringDistance) / 1000 : parseFloat(stringDistance);
  };

  await cluster.task(async ({ page, data }) => {
    let { origin, destination } = data;

    await page.setRequestInterception(true);
    page.on('request', request => {
      if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
        request.abort();
      } else {
        request.continue();
      }
    });

    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    let selectors = {
      distance: '.xB1mrd-T3iPGc-iSfDt-tUvA6e > div:nth-child(3)',
    };

    try {
      await page.goto(url);
      const distance = await page.$eval(selectors.distance, el => el.innerText);
      page.close();

      return { status: 'OK', distance: formatDistance(distance) };
    } catch (error) {
      return { status: 'ERROR' };
    }
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
