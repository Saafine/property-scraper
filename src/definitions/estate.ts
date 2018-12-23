export interface IEstate {
  price: string; // todo all should be numbers
  area: string;
  rooms: string;
  floorNo: string;

  year: string;
  marketType: string; // todo enum
  rent: string;
}

export interface IEstateMeta {
  url: string;
  timestamp: number;
}