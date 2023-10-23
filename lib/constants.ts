export const IMA_STATUS_CHOICES = {
  approved: "APPROVED",
  discredited: "DISCREDITED",
  pending: "PENDING_PUBLICATION",
  grandfathered: "GRANDFATHERED",
  questionable: "QUESTIONABLE",
};

export const CRYSTAL_SYSTEM_CHOICES = {
  1: "Hexagonal",
  2: "Isometric",
  3: "Monoclinic",
  4: "Orthorhombic",
  5: "Tetragonal",
  6: "Triclinic",
  7: "Trigonal",
  8: "Amorphous",
  9: "Icosahedral",
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

export const PHYSICAL_PROPS_TITLES = {
  colorNote: ["Color note"],
  color: ["Color entities", "recognized using a custom trained NER model"],
  streakNote: ["Streak note"],
  streak: ["Streak entities", "recognized using a custom trained NER model"],

  lustre: ["Lustre"],
  // lustreNote: ["Lustre note"],
  fracture: ["Fracture"],
  // fractureNote: ["Fracture note"],
  transparency: ["Transparency"],
  luminescence: ["Luminescence"],
  tenacity: ["Tenacity"],
  hardness: ["Hardness"],
  density: ["Measured density"],
  densityCalculated: ["Calculated density"],
};

export const SECTION_FIELDS = {
  // The order of keys matters, it defines the order of the properties in the output.
  // Comment out the keys to remove the properties from the output
  "Physical properties": [
    "colorNote",
    "color",
    "streakNote",
    "streak",
    "lustre",
    "lustreNote",
    "fracture",
    "fractureNote",
    "transparency",
    "luminescence",
    "tenacity",
    "hardness",
    "density",
    "densityCalculated",
   ],
  "Optical properties": [],
};

//
let _getOpposite = (value: boolean, value_: boolean) => {
  return value ? value_ : !value_;
};

export const FIELDS = {
  colorNote: {
    title: "Color note",
    subtitle: "Original color note from the source",
    isCollapsed: function (isGrouping: boolean) { return _getOpposite.call(this, isGrouping, true) } ,
    default: () => null,
  },
  color: {
    title: "Color",
    subtitle: "Color entities, recognized using a custom trained NER model",
    isCollapsed: false,
    default: () => [],
  },
  streakNote: {
    title: "Streak note",
    subtitle: "Original streak note from the source",
    isCollapsed: function (isGrouping: boolean) { return _getOpposite.call(this, isGrouping, true) },
    default: () => null,
  },
  streak: {
    title: "Streak",
    subtitle: "Streak entities, recognized using a custom trained NER model",
    isCollapsed: false,
    default: () => [],
  },
  lustre: {
    title: "Lustre",
    subtitle: null,
    isCollapsed: false,
    default: () => null,
  },
  fracture: {
    title: "Fracture",
    subtitle: null,
    isCollapsed: false,
    default: () => null,
  },
  transparency: {
    title: "Transparency",
    subtitle: null,
    isCollapsed: false,
    default: () => null,
  },
  luminescence: {
    title: "Luminescence",
    subtitle: null,
    isCollapsed: false,
    default: () => null,
  },
  tenacity: {
    title: "Tenacity",
    subtitle: null,
    isCollapsed: false,
    default: () => null,
  },
  hardness: {
    title: "Hardness",
    subtitle: null,
    isCollapsed: false,
    default: () => null,
  },
  density: {
    title: "Measured density",
    subtitle: null,
    isCollapsed: false,
    default: () => null,
  },
  densityCalculated: {
    title: "Calculated density",
    subtitle: null,
    isCollapsed: false,
    default: () => null,
  },
};
