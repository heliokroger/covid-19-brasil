import * as dotenv from 'dotenv';

dotenv.config();

const {
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN_KEY,
    TWITTER_ACCESS_TOKEN_SECRET,
} = process.env;

export const WORLDOMETERS_CORONAVIRUS_URL: string =
    'https://www.worldometers.info/coronavirus';
export {
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN_KEY,
    TWITTER_ACCESS_TOKEN_SECRET,
};
