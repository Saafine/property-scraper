const puppeteer = require('puppeteer');

export class Scraper {
  constructor(private url: string) {
  }

  public async getBodyHTML(): Promise<string> {
    const getBodyHTMLFn = () => document.body.innerHTML; // todo can this return document ?
    return await this.scrape(getBodyHTMLFn);
  }

  private async scrape(pageFn: () => any): Promise<any> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(this.url);
    const result = await page.evaluate(pageFn);
    browser.close();
    return result;
  }
}