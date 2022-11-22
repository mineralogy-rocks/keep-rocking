export interface BaseIdName {
  id: string;
  name: string;
}

export interface Formula {
  formula: string;
  note: string | null;
  source: {
    id: number;
    name: string;
    url: string;
  };
  show_on_site: boolean;
  created_at: Date;
}

export interface Hierarchy extends BaseIdName {
  url: string;
}

export interface CrystalSystem extends BaseIdName {
  count?: number;
}

export interface Status {
  status_id: number;
  group: {
    id: number;
    name: string;
  };
  description_short: string;
  description_long: string;
}

export interface Relation {
  id: string;
  counts: number;
  group: BaseIdName;
}

export interface DiscoveryCountry extends BaseIdName {
  region: string;
  iso_code: string;
  counts?: number;
}

export interface History {
  id: number;
  discovery_year: number;
  ima_year: number;
  publication_year: number;
  approval_year: number;
  discovery_year_note: string;
  first_usage_date: number;
  first_known_use: string;
}
