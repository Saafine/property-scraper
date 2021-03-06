// These are available in browser. Unavailable in node version 10.13.0

export enum _NodeFilter {
  SHOW_ALL = -1,
  SHOW_ATTRIBUTE = 2,
  SHOW_CDATA_SECTION = 8,
  SHOW_COMMENT = 128,
  SHOW_DOCUMENT = 256,
  SHOW_DOCUMENT_FRAGMENT = 1024,
  SHOW_DOCUMENT_TYPE = 512,
  SHOW_ELEMENT = 1,
  SHOW_ENTITY = 32,
  SHOW_ENTITY_REFERENCE = 16,
  SHOW_NOTATION = 2048,
  SHOW_PROCESSING_INSTRUCTION = 64,
  SHOW_TEXT = 4
}

export enum _Node {
  ELEMENT_NODE = 1,
  ATTRIBUTE_NODE = 2,
  TEXT_NODE = 3,
  CDATA_SECTION_NODE = 4,
  ENTITY_REFERENCE_NODE = 5,
  ENTITY_NODE = 6,
  PROCESSING_INSTRUCTION_NODE = 7,
  COMMENT_NODE = 8,
  DOCUMENT_NODE = 9,
  DOCUMENT_TYPE_NODE = 10,
  DOCUMENT_FRAGMENT_NODE = 11,
  NOTATION_NODE = 12
}