export interface Mineral {
  id: string;
  name: string;
  slug : string;
  description: string;
  url: string;
  statuses: [number];
  is_main: boolean;
  is_match: boolean;
  is_current: boolean;
  is_visible?: boolean;
};

export interface Relation {
  id: number;
  mineral: string;
  relation: string;
}

export interface Props {
  item: Mineral | null,
};
