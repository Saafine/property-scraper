import { Scraper } from './core/scraper';
import { EstateExtractorManager } from './core/extractors/estate-extractor-manager';
import { DataTransferService } from './core/data-transfer.service';
import { IEstateMeta } from './definitions';

// const scrapeTargetUrl = 'https://www.otodom.pl/oferta/58-m2-4-pok-obecnie-wynajmowane-zobacz-ID3RcUs.html#0ac3cbdbe3';
// const scrapeTargetUrl = 'https://www.otodom.pl/oferta/bezposrednio-3-pokoje-na-srodmiescia-wola-ID3RpU0.html#8dc5ddf92f';
// const scrapeTargetUrl = 'https://www.otodom.pl/oferta/bezposrednio-ul-redutowa-wola-38m2-do-remontu-ID3R5TG.html#8dc5ddf92f';
const scrapeTargetUrl = 'https://www.otodom.pl/oferta/rozkladowe-3-pok-z-garderoba-osobna-kuchnia-balkon-ID3NDwu.html#8dc5ddf92f';

export class MainController {
  private scraper: Scraper;
  private estateExtractorManager: EstateExtractorManager;
  private dataTransferService: DataTransferService;

  constructor() {
    this.scraper = new Scraper(scrapeTargetUrl);
    this.estateExtractorManager = new EstateExtractorManager();
    this.dataTransferService = new DataTransferService(); // todo should these refs be kept?

    this.run();
  }

  private async run(): Promise<void> {
    const bodyHTML = await this.scraper.getBodyHTML();
    // const bodyHTML = await this.dataTransferService.readFromFile(SCRAPED_DATA_PATH); // todo testing only
    const extractedData = this.estateExtractorManager.getExtractedData(scrapeTargetUrl, bodyHTML);

    const estateMeta: IEstateMeta = {
      url: scrapeTargetUrl,
      timestamp: Date.now()
    };

    const estateData = Object.assign({}, estateMeta, extractedData);

    this.dataTransferService.saveToFile(`${ estateMeta.timestamp }.html`, bodyHTML).catch(console.error);
    this.dataTransferService.saveToFile(`${ estateMeta.timestamp }.json`, estateData).catch(console.error);
  }
}