import * as puppeteer from 'puppeteer';
import { NODE_ENV } from '../constants';

export default class BrowserService {
    public static instance: puppeteer.Browser;

    public static async open() {
        this.instance = await puppeteer.launch(
            NODE_ENV === 'production' && {
                args: ['--no-sandbox'],
                executablePath: '/usr/bin/chromium-browser',
            }
        );
    }

    public static close() {
        return this.instance.close();
    }
}
