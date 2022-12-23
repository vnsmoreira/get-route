import scraper from '#puppeteer';
import mongoConnect from '#database';
import { waitForPromises } from './utils';

//insert functions that need to be executed before routes initialization
const requirements = [scraper.initializeCluster(), mongoConnect()];

const waitForRequirements = async onSuccess => waitForPromises(requirements, onSuccess);

export default waitForRequirements;
