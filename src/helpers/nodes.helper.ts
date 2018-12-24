import { _Node, _NodeFilter } from '../constants/node';
import { similiarStrings } from './strings.helper';

export function removeChildrenFromNode(node: Node): Node {
  const nodeCopy = node.cloneNode(true);
  const nodeChildren = Array.from(nodeCopy.childNodes);
  for (let childNode of nodeChildren) {
    childNode.nodeType !== _Node.TEXT_NODE && nodeCopy.removeChild(childNode);
  }
  return nodeCopy;
}

export function searchNodesForText(searchText: string, nodes: Element, doc: Document): Element {
  let node: Node;
  const walk = doc.createTreeWalker(nodes, _NodeFilter.SHOW_TEXT, null);
  while (node = walk.nextNode()) {
    const { textContent } = node;
    if (similiarStrings(textContent, searchText)) {
      return node.parentElement;
    }
  }
}