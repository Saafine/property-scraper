import { IEstate } from '../../../definitions';

export interface IEstateExtractor {
  extractEstate(bodyHTML: string): IEstate;

  getEstatePrice(bodyHTML: string): string;
}