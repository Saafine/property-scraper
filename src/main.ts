import { Scraper } from './core/scraper';
import { EstateExtractorManager } from './core/extractors/estate-extractor-manager';
import { SaveEstateService } from './core/save-estate.service';

const scrapeTargetUrl = 'https://www.otodom.pl/oferta/58-m2-4-pok-obecnie-wynajmowane-zobacz-ID3RcUs.html#0ac3cbdbe3';

const RAW_HTML_FILE_NAME = 'output.html';
const EXTRACTED_DATA_FILE_NAME = 'estate.json';

export class MainController {
  private scraper: Scraper;
  private estateExtractorManager: EstateExtractorManager;
  private saveEstateService: SaveEstateService;

  constructor() {
    this.scraper = new Scraper(scrapeTargetUrl);
    this.estateExtractorManager = new EstateExtractorManager();
    this.saveEstateService = new SaveEstateService(); // todo should these refs be kept?

    this.run();
  }

  private async run(): Promise<void> {
    const bodyHTML = await this.scraper.getBodyHTML();
    const extractedData = this.estateExtractorManager.getExtractedData(scrapeTargetUrl, bodyHTML);
    this.saveEstateService.saveToFile(RAW_HTML_FILE_NAME, bodyHTML);
    this.saveEstateService.saveToFile(EXTRACTED_DATA_FILE_NAME, extractedData);
  }
}