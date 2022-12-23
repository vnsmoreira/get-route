import { app } from './app';
import scraper from '#puppeteer';

const port = process.env.PORT || 80;

const startServer = () => app.listen(port);

scraper.onClusterInitialize(() => {
  startServer();
  console.log('Running on port: ', port);
});
