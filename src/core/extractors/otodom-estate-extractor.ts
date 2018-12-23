import { IEstate } from '../../definitions';
import { IEstateExtractor } from './definitions';
import { JSDOM } from 'jsdom';
import { similiarStrings } from '../../helpers/string-helpers';
import { _Node, _NodeFilter } from '../../constants/node';

const MAIN_LIST_CLASS = '.main-list';
const SUB_LIST_CLASS = '.sub-list';


interface IOtodomSubElement {
  text: string;
  value?: string;
}

interface IOtodomEstateSublist {
  [key: string]: IOtodomSubElement;
}

export class OtodomEstateExtractor {
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
  getPrice(doc: Document): string {
    return doc.querySelector(`${ MAIN_LIST_CLASS } .param_price strong`).innerHTML;
  }

  getArea(doc: Document): string {
    return doc.querySelector(`${ MAIN_LIST_CLASS } .param_m strong`).innerHTML;
  }

  getRooms(doc: Document): string {
    const list = doc.querySelector(`${ MAIN_LIST_CLASS }`);
    const findElement = this.searchNodesForText('liczba pokoi', list, doc);
    return findElement && findElement.closest('li').querySelector('strong').innerHTML;
  }

  getFloorNo(doc: Document): string {
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
      const findElement = this.searchNodesForText(subList[key].text, list, doc);
      const parentElement = findElement && findElement.closest('li');
      subList[key].value = this.removeChildrenFromNode(parentElement).textContent.trim();
    }
    return subList;
  };

  // abstract
  private removeChildrenFromNode(node: Node): Node {
    const nodeCopy = node.cloneNode(true);
    const nodeChildren = Array.from(nodeCopy.childNodes);
    for (let childNode of nodeChildren) {
      childNode.nodeType !== _Node.TEXT_NODE && nodeCopy.removeChild(childNode);
    }
    return nodeCopy;
  }

  private searchNodesForText(searchText: string, nodes: Element, doc: Document): Element {
    let node: Node;
    const walk = doc.createTreeWalker(nodes, _NodeFilter.SHOW_TEXT, null);
    while (node = walk.nextNode()) {
      const { textContent } = node;
      if (similiarStrings(textContent, searchText)) {
        return node.parentElement;
      }
    }
  }
}
