import { IEstate } from '../../definitions';
import { IEstateExtractor } from './definitions';
import { JSDOM } from 'jsdom';

export class OtodomEstateExtractor implements IEstateExtractor {
  public extractEstate(bodyHTML: string): IEstate {
    return {
      price: this.getEstatePrice(bodyHTML),
    };
  }

  public getEstatePrice(bodyHTML: string): string { // todo why public?
    const dom = new JSDOM(bodyHTML); // todo shouldnt parse dom every time, or maybe never
    return dom.window.document.querySelector('.param_price > span > strong').innerHTML;
  }
}
