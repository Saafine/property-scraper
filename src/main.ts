import { Scraper } from './core/scraper';
import { EstateExtractorManager } from './core/extractors/estate-extractor-manager';
import { DataTransferService } from './core/data-transfer.service';
const scrapeTargetUrl = 'https://www.otodom.pl/oferta/58-m2-4-pok-obecnie-wynajmowane-zobacz-ID3RcUs.html#0ac3cbdbe3';
const SCRAPED_DATA_PATH =  './src/outputs/output.html';


const RAW_HTML_FILE_NAME = 'output.html';
const EXTRACTED_DATA_FILE_NAME = 'estate.json';

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
    // const bodyHTML = await this.scraper.getBodyHTML();
    const bodyHTML = await this.dataTransferService.readFromFile(SCRAPED_DATA_PATH);
    const extractedData = this.estateExtractorManager.getExtractedData(scrapeTargetUrl, bodyHTML);
    this.dataTransferService.saveToFile(RAW_HTML_FILE_NAME, bodyHTML);
    this.dataTransferService.saveToFile(EXTRACTED_DATA_FILE_NAME, extractedData);
  }
}