import { Cluster } from 'puppeteer-cluster';
import { getDistance } from './task';

const puppeteerOptions = {
  args: [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
  ],
  headless: true,
};

let cluster = null;

let scraper = {};

scraper.initializeCluster = async () => {
  cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 100,
    puppeteerOptions,
  });

  await cluster.task(getDistance);

  await cluster.execute({ addresses: ['01311000', '04335000'] });

  console.log('[app] cluster initialized');

  return cluster;
};

scraper.onClusterInitialize = async callback => {
  try {
    await scraper.initializeCluster();
    callback();
  } catch (error) {
    console.log(error);
  }
};

scraper.getCluster = () => cluster;

export default scraper;
