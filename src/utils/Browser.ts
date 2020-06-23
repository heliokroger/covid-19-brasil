import * as puppeteer from 'puppeteer';

export default class BrowserService {
    public static instance: puppeteer.Browser;

    public static async open() {
        this.instance = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
        });
    }

    public static close() {
        return this.instance.close();
    }
}
