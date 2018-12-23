import { IEstate } from '../../../definitions';

export interface IEstateExtractor { // todo needed?
  extractEstate(bodyHTML: string): IEstate;

  getPrice(doc: Document): string; // todo all should be numbers
  getArea(doc: Document): string;
  getRooms(doc: Document): string
  getFloorNo(doc: Document): string;

  getMarketType(doc: Document): string; // todo enum
  getYear(doc: Document): string;
  getRent(doc: Document): string;
}