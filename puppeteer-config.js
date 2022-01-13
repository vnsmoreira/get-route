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

const setRequestInterception = async page => {
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
      request.abort();
    } else {
      request.continue();
    }
  });
};

module.exports = { puppeteerOptions, setRequestInterception };
