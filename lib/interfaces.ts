export interface BaseIdName {
  id: string;
  name: string;
}

export interface From {
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

export interface FormulaGroupBySource {
  [key: string]: Formula[];
}

export interface Crystallography {
  id: number;
  mineral: string;
  crystal_system: BaseIdName;
  crystal_class: BaseIdName;
  space_group: BaseIdName;
}

export interface CrystalSystem extends BaseIdName {
  count?: number;
  from?: From;
}

export interface StatusGroup {
  group: {
    id: number;
    name: string;
  }
}

export interface Status {
  status_id: number;
  group: StatusGroup["group"];
  description_short: string;
  description_long: string;
}

export interface StatusWithRelation extends Status {
  mineral: {
    id: string;
    name: string;
    slug: string;
    mindat_id?: number;
  }
};

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
  statuses: [number];
  depth: number;
  formulas: Formula[];
  crystal_system: CrystalSystem|null;
};

export interface Link {
  name: string;
  link: string;
}

export interface colorTuple {
  textColor: string;
  backgroundColor: string;
}

