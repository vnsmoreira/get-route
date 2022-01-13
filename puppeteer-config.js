const { Cluster } = require('puppeteer-cluster');
const { getDistance } = require('./scrape');

const puppeteerOptions = {
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
};

const getCluster = async () => {
  let cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 4,
    puppeteerOptions,
  });

  await cluster.task(getDistance);

  return cluster;
};

module.exports = getCluster;
