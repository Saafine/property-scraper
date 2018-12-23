import { OtodomEstateExtractor } from './otodom-estate-extractor';
import { IEstate } from '../../definitions';

export class EstateExtractorManager {
  public getExtractedData(url: string, bodyHTML: string): IEstate {
    if (url === 'otodom' || url !== 'otodom') {
      return new OtodomEstateExtractor().extractEstate(bodyHTML);
    } else {
      throw new Error('EstateExtractorManager | Unrecognized Estate Provider');
    }
  }
}