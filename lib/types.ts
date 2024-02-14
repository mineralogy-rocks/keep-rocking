import { Formula, Crystallography, CrystalSystem, Status, Relation, Discovery, History, Link, Inheritance, GroupingMember } from './interfaces';


export type paginatedApiResponse = {
  results: any[];
  next: string;
  previous: string;
}

export type exploreApiResponse = {
  id: string;
  name: string;
  slug: string;
  ns_index: string;
  ima_statuses: string[];
  ima_notes: string[];
  ima_symbol: string;
  description: string;
  is_grouping: boolean;
  seen: number;
  updated_at: Date;
  formulas: Formula[];
  crystallography: CrystalSystem[];
  statuses: Status[];
  relations: Relation[];
  discovery_countries: Discovery[];
  history: History;
  inheritance_chain: Inheritance[];
  links: Link[];
}

export type mineralDetailApiResponse = {
  id: string;
  name: string;
  slug: string;
  mindat_id: number|null;
  ima_symbol: string;
  description: string;
  is_grouping: boolean;
  seen: number;
  updated_at: Date;
  formulas: Formula[];
  statuses: Status[];
  crystallography: Crystallography,
  history: History;
  structures: any[];
  elements: {
    element: string;
    count: number;
  }[],
  inheritance_chain?: Inheritance[];
  members?: GroupingMember[];
  contexts: any[];
};

export type exploreApiRequest = {
  q?: string;
  cursor?: string;
  ima_only?: boolean;
};

export type mindatDataNode = {
  items: {
    [key: string]: {
      value: any;
      ids: [number];
    }[];
  };
  minerals: {
    id: number;
    name: string;
    color: string;
    statuses: [number];
  }[];
};
