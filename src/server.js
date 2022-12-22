import { app } from './app';
import scraper from '#puppeteer';

const port = process.env.PORT || 3000;

const startServer = () => app.listen(port);

scraper.onClusterInitialize(() => {
  startServer();
  console.log('Running on port: ', port);
});
