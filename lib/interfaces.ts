export interface BaseIdName {
  id: string | number;
  name: string;
}

export interface BaseIdNameSlug extends BaseIdName {
  slug: string;
}

export interface KeyVal {
  key: string;
  value: string | number;
}

export interface From {
  id: string;
  mindat_id?: number;
  slug: string;
  name: string;
  statuses: [number];
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
  created_at: string;
  from?: From;
}

export interface Crystallography {
  id: number;
  mineral?: string;
  crystal_system: BaseIdName;
  crystal_class?: BaseIdName;
  space_group?: BaseIdName;
}

export interface GroupingMember extends BaseIdName {
  slug : string;
  description: string;
  url: string;
  statuses: [number];
  crystal_system: BaseIdName;
  history: History;
};

export interface CrystalSystem extends BaseIdName {
  count?: number;
}

export interface StatusGroup {
  group: {
    id: number;
    name: string;
    slug: string;
  }
}

export interface Status {
  status_id: number;
  group: StatusGroup["group"];
  description_short: string;
  description_long: string;
}

export interface Relation {
  id: string;
  count: number;
  group: {
    id: number;
    name: string;
  };
}

export interface Discovery extends BaseIdName {
  region: string;
  iso_code: string;
  count?: number;
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

export interface Inheritance {
  mindat_id: number|null;
  id: string;
  name: string;
  slug: string;
  prop: number,
  statuses: [number];
  formulas: Formula[];
  crystallography: Crystallography|null;
  contexts: any[];
};

export interface Link {
  name: string;
  link: string;
}

export interface colorTuple {
  textColor: string;
  backgroundColor: string;
}

export interface initialSearchQuery {
  cursor: string;
}

export interface initialQuery extends initialSearchQuery {
  ima_only: boolean;
}

export interface ExploreQuery extends initialQuery {
  q: string;
}

export interface PostTag extends BaseIdName {};
export interface PostCategory extends BaseIdNameSlug {};
