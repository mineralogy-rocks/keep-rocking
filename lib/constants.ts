import { mindatDataNode } from "@/lib/types";


export const IMA_STATUS_CHOICES = {
  approved: "APPROVED",
  discredited: "DISCREDITED",
  pending: "PENDING_PUBLICATION",
  grandfathered: "GRANDFATHERED",
  questionable: "QUESTIONABLE",
};

export const STATUS_GROUPS_PLURAL = {
  2: "Synonyms",
  3: "Varieties",
  4: "Polytypes",
  5: "Obsolete terms",
  8: "Rocks",
  11: "IMA-approved minerals",
};

export const COMPLEMENTING_STATUS_GROUPS = {
  1: [1, 8],
  2: [2, 3, 4, 5, 6, 7, 9, 10],
  3: [11]
};

export const STRUCTURAL_DATA_KEYS = [
  "a",
  "b",
  "c",
  "alpha",
  "beta",
  "gamma",
  "volume",
];

export const HISTORY_DATA_MAP = {
  discovery_year: "Discovery year",
  publication_year: "Publication year",
  ima_year: "IMA year",
  approval_year: "Approval year",
};

export const DATA_CONTEXT_STRUCTURE = {
  minerals: [],
  items: {},
}
