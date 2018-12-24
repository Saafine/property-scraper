import { IEstate } from '../../definitions';
import { JSDOM } from 'jsdom';
import { IEstateExtractor } from './definitions';
import { removeChildrenFromNode, searchNodesForText } from '../../helpers/nodes.helper';

const MAIN_LIST_CLASS = '.main-list';
const SUB_LIST_CLASS = '.sub-list';

interface IOtodomSubElement {
  text: string;
  value?: string;
}

interface IOtodomEstateSublist {
  [key: string]: IOtodomSubElement;
}

export class OtodomEstateExtractor implements IEstateExtractor {
  public extractEstate(bodyHTML: string): IEstate {
    const dom: JSDOM = new JSDOM(bodyHTML); // todo shouldnt puppetter handle this?
    const doc = dom.window.document;
    const { year, marketType, rent } = this.getSublistValues(doc);
    return {
      price: this.getPrice(doc),
      area: this.getArea(doc),
      rooms: this.getRooms(doc),
      floorNo: this.getFloorNo(doc),
      year: year.value,
      marketType: marketType.value,
      rent: rent.value
    };
  }

  // todo why these are public
  private getPrice(doc: Document): string {
    return doc.querySelector(`${ MAIN_LIST_CLASS } .param_price strong`).innerHTML;
  }

  private getArea(doc: Document): string {
    return doc.querySelector(`${ MAIN_LIST_CLASS } .param_m strong`).innerHTML;
  }

  private getRooms(doc: Document): string {
    const list = doc.querySelector(`${ MAIN_LIST_CLASS }`);
    const findElement = searchNodesForText('liczba pokoi', list, doc);
    return findElement && findElement.closest('li').querySelector('strong').innerHTML;
  }

  private getFloorNo(doc: Document): string {
    return doc.querySelector(`${ MAIN_LIST_CLASS } .param_floor_no strong`).innerHTML;
  }

  private getSublistValues(doc: Document): IOtodomEstateSublist {
    const subList: IOtodomEstateSublist = {
      year: {
        text: 'Rok budowy:'
      },
      marketType: {
        text: 'Rynek:'
      },
      rent: {
        text: 'Czynsz:'
      }
    };
    for (let key in subList) {
      const list = doc.querySelector(`${ SUB_LIST_CLASS }`);
      const findElement = searchNodesForText(subList[key].text, list, doc);
      const parentElement = findElement && findElement.closest('li');
      subList[key].value = parentElement ? removeChildrenFromNode(parentElement).textContent.trim() : '';
    }
    return subList;
  };
}
