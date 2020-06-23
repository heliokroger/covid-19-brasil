import Browser from '../utils/Browser';
import { WORLDOMETERS_CORONAVIRUS_URL } from '../constants';

export interface Status {
    newDeaths: number;
    newCases: number;
    newRecovered: number;
}

export default class ScraperService {
    private static normalizeText(text: string): number {
        return Number(text.replace('+', '').replace(/\,/g, ''));
    }

    public static async getBrazilStatus(): Promise<Status> {
        const page = await Browser.instance.newPage();
        await page.goto(WORLDOMETERS_CORONAVIRUS_URL);

        const [currentStatus, oldStatus] = await page.evaluate(() => {
            const getStatus = (selector: string) => {
                const table = <HTMLTableElement>(
                    document.getElementById(selector)
                );
                const countries = Array.from(table.rows).filter(
                    (row) => row.className.indexOf('row_continent') === -1
                );
                const [firstRow] = countries;
                const labels = Array.from(firstRow.cells).map((cell) =>
                    cell.innerText.replace(/\n|\s/gs, '')
                );
                return countries
                    .map((country) => {
                        return Array.from(country.cells).reduce(
                            (prev: any, next, index) => {
                                prev[labels[index]] = next.innerText;
                                return prev;
                            },
                            {}
                        );
                    })
                    .filter((country: any) => country['#'] !== '#');
            };

            return [
                getStatus('main_table_countries_today'),
                getStatus('main_table_countries_yesterday'),
            ];
        });

        await page.close();

        const currentBrazilStatus = currentStatus.find(
            (country: any) => country['Country,Other'] === 'Brazil'
        );

        const oldBrasilStatus = oldStatus.find(
            (country: any) => country['Country,Other'] === 'Brazil'
        );

        const newRecovered: string = String(
            this.normalizeText(currentBrazilStatus.TotalRecovered) -
                this.normalizeText(oldBrasilStatus.TotalRecovered)
        );

        return {
            newDeaths: this.normalizeText(currentBrazilStatus.NewDeaths),
            newCases: this.normalizeText(currentBrazilStatus.NewCases),
            newRecovered: this.normalizeText(newRecovered),
        };
    }
}
