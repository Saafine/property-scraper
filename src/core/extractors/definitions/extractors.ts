import { IEstate } from '../../../definitions';

export interface IEstateExtractor { // todo needed?
  extractEstate(bodyHTML: string): IEstate;
}