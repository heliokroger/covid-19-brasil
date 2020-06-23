import * as Twitter from 'twitter';
import * as moment from 'moment';
import {
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN_KEY,
    TWITTER_ACCESS_TOKEN_SECRET,
} from '../constants';
import { Status } from './ScraperService';

export default class TwitterService {
    private static client: Twitter;

    public static connect() {
        this.client = new Twitter({
            consumer_key: TWITTER_CONSUMER_KEY,
            consumer_secret: TWITTER_CONSUMER_SECRET,
            access_token_key: TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
        });
    }

    private static formatNumber(number: string): string {
        if (Number(number) > 999) {
            const rawNumber = number.slice(0, number.length - 3);
            if (rawNumber === '1') return 'Mil';
            return rawNumber + ' mil';
        }

        if (Number(number) > 999999) {
            const rawNumber = number.slice(0, number.length - 6);
            if (rawNumber === '1') return '1 milhão';
            return rawNumber + ' milhões';
        }

        return number;
    }

    private static getPeriod(): string {
        const hour = Number(moment().format('HH'));
        if (hour > 12) return 'tarde';
        if (hour > 18) return 'noite';
        return 'manhã';
    }

    public static buildStatusTweet(status: Status): string {
        const { newDeaths, newCases, newRecovered } = status;

        const today = moment().format('DD/MM');

        return (
            `🇧🇷 Boletim do COVID-19 da ${this.getPeriod()} de hoje (${today})\n\n` +
            `✝️ ${this.formatNumber(String(newDeaths))} novas mortes\n` +
            `🤒 ${this.formatNumber(String(newCases))} novos casos\n` +
            `🙏🏻 ${this.formatNumber(
                String(newRecovered)
            )} novas pessoas recuperadas\n`
        );
    }

    public static tweet(status: string): Promise<any> {
        return new Promise((resolve: Function) => {
            this.client.post(
                'statuses/update',
                { status },
                (err: Error, _tweet: Object, response: Object) => {
                    if (err) throw err;
                    resolve(response);
                }
            );
        });
    }
}
