import { Formula, CrystalSystem, Status, Relation, Discovery, History, Link, Inheritance } from './interfaces';


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
  ima_symbol: string;
  description: string;
  is_grouping: boolean;
  seen: number;
  updated_at: Date;
  formulas: Formula[];
  crystal_systems: CrystalSystem[];
  statuses: Status[];
  relations: Relation[];
  discovery_countries: Discovery[];
  history: History;
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
  inheritance_chain: Inheritance[];
};

export type exploreApiRequest = {
  q?: string;
  cursor?: string;
  ima_only?: boolean;
};
