import { CronJob } from 'cron';
import TwitterService from './services/TwitterService';
import Browser from './utils/Browser';
import Scraper from './services/ScraperService';

TwitterService.connect();

const run = async () => {
    await Browser.open();

    const status = await Scraper.getBrazilStatus();
    const tweet = TwitterService.buildStatusTweet(status);

    await TwitterService.tweet(tweet);

    await Browser.close();
};

new CronJob('00 00 9,16 * * *', run).start();

run();
