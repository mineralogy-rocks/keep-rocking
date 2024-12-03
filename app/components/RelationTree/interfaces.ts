export interface mineral {
  id: string;
  name: string;
  slug : string;
  description: string;
  url: string;
  statuses: [number];
  is_main: boolean;
  is_match: boolean;
  is_current: boolean;
};

export interface relation {
  id: number;
  mineral: string;
  relation: string;
}

export interface Props {
  item: mineral | null,
};
