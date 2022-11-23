import { Formula, Hierarchy, CrystalSystem, Status, Relation, Discovery, History } from './interfaces';

export type paginatedApiResponse = {
  results: any[];
  next: string;
  previous: string;
}



export type mineralApiResponse = {
  id: string;
  name: string;
  url: string;
  ns_index: string;
  ima_symbol: string;
  description: string;
  is_grouping: boolean;
  seen: number;
  updated_at: Date;
  formulas: Formula[];
  hierarchy: Hierarchy[];
  crystal_systems: CrystalSystem[];
  statuses: Status[];
  relations: Relation[];
  discovery_countries: Discovery[];
  history: History;
}
