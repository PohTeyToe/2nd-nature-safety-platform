// Types
export interface Partnership {
  id: string;
  name: string;
  category: "Construction" | "Industrial" | "Union" | "Government" | "Business" | "Gateway/Labour";
  memberCount: string;
  location: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  fitScore: number;
  status: "Not Contacted" | "Reached Out" | "Meeting Scheduled" | "Partnered" | "Not Interested";
  notes: string;
  lastContacted: string;
  priority: "top" | "other";
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  company: string;
  certifications: Certification[];
}

export interface Certification {
  id: string;
  name: string;
  status: "Valid" | "Expiring Soon" | "Expired" | "Not Started";
  issueDate: string;
  expiryDate: string;
}

export const POSITION_TEMPLATES: Record<string, string[]> = {
  "Construction Worker": ["Working at Heights", "WHMIS", "Construction Awareness (4-Step)"],
  "Electrician": ["Working at Heights", "WHMIS", "Confined Space", "Supervisor Awareness"],
  "Forklift Operator": ["Forklift Certification", "WHMIS"],
  "General Labourer": ["WHMIS", "Construction Awareness", "Working at Heights"],
  "Supervisor": ["Supervisor Awareness", "WHMIS", "Working at Heights", "JHSC Certification"],
  "Warehouse Worker": ["Forklift Certification", "WHMIS", "Hoisting and Rigging"],
  "Factory Worker": ["WHMIS", "Confined Space", "Lockout/Tagout"],
};

export const SEED_PARTNERSHIPS: Partnership[] = [
  {
    id: "1",
    name: "Greater Ottawa Home Builders' Association (GOHBA)",
    category: "Construction",
    memberCount: "420+",
    location: "Ottawa",
    contactPerson: "Soula Burrell",
    contactEmail: "info@gohba.ca",
    contactPhone: "613-723-2926",
    website: "gohba.ca",
    fitScore: 5,
    status: "Reached Out",
    notes: "Emailed Soula Burrell to propose partnership meeting",
    lastContacted: "2026-03-28",
    priority: "top",
  },
  {
    id: "2",
    name: "Ottawa and District Labour Council (ODLC)",
    category: "Gateway/Labour",
    memberCount: "90 union locals / 55,000 workers",
    location: "Ottawa",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    website: "odlc.ca",
    fitScore: 5,
    status: "Partnered",
    notes: "Existing partnership - model to replicate",
    lastContacted: "2026-03-25",
    priority: "top",
  },
  {
    id: "3",
    name: "SMART Local 47 Ottawa",
    category: "Construction",
    memberCount: "Eastern Ontario sheet metal workers",
    location: "Ottawa",
    contactPerson: "Brent James",
    contactEmail: "brent@smwia47ottawa.org",
    contactPhone: "",
    website: "smwia47ottawa.org",
    fitScore: 5,
    status: "Not Contacted",
    notes: "Researching - contact Brent James for initial conversation",
    lastContacted: "",
    priority: "top",
  },
  {
    id: "4",
    name: "Ontario Electrical League (OEL) Ottawa Chapter",
    category: "Construction",
    memberCount: "38,000 province-wide",
    location: "Ottawa / Province-wide",
    contactPerson: "Michelle Barta",
    contactEmail: "michelle.barta@oel.org",
    contactPhone: "",
    website: "oel.org",
    fitScore: 5,
    status: "Not Contacted",
    notes: "",
    lastContacted: "",
    priority: "top",
  },
  {
    id: "5",
    name: "Employment Ontario Ottawa",
    category: "Government",
    memberCount: "9 agencies, 11 locations",
    location: "Ottawa",
    contactPerson: "",
    contactEmail: "EOottawa@ottawa.ca",
    contactPhone: "613-580-2424 x14372",
    website: "ottawa.ca",
    fitScore: 5,
    status: "Not Contacted",
    notes: "",
    lastContacted: "",
    priority: "top",
  },
  {
    id: "6",
    name: "Ontario Industrial Roofing Contractors Association (OIRCA)",
    category: "Construction",
    memberCount: "Province-wide",
    location: "Province-wide",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    website: "ontarioroofing.com",
    fitScore: 4,
    status: "Not Contacted",
    notes: "",
    lastContacted: "",
    priority: "other",
  },
  {
    id: "7",
    name: "Ontario Pipe Trades Council (OPTC)",
    category: "Construction",
    memberCount: "22,000+",
    location: "Province-wide",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    website: "optc.org",
    fitScore: 4,
    status: "Not Contacted",
    notes: "",
    lastContacted: "",
    priority: "other",
  },
  {
    id: "8",
    name: "Thermal Insulation Association of Canada (TIAC)",
    category: "Construction",
    memberCount: "National",
    location: "National HQ in Ottawa",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    website: "tiac.ca",
    fitScore: 4,
    status: "Not Contacted",
    notes: "",
    lastContacted: "",
    priority: "other",
  },
  {
    id: "9",
    name: "Ontario General Contractors Association (OGCA)",
    category: "Construction",
    memberCount: "70% of ICI construction",
    location: "Province-wide",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    website: "ogca.ca",
    fitScore: 4,
    status: "Not Contacted",
    notes: "",
    lastContacted: "",
    priority: "other",
  },
  {
    id: "10",
    name: "Canadian Manufacturers & Exporters (CME)",
    category: "Industrial",
    memberCount: "10,000+ (85% SMEs)",
    location: "National",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    website: "cme-mec.ca",
    fitScore: 3,
    status: "Not Contacted",
    notes: "",
    lastContacted: "",
    priority: "other",
  },
  {
    id: "11",
    name: "Ontario Food Protection Association (OFPA)",
    category: "Industrial",
    memberCount: "Province-wide",
    location: "Province-wide",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    website: "ofpa.on.ca",
    fitScore: 3,
    status: "Not Contacted",
    notes: "",
    lastContacted: "",
    priority: "other",
  },
  {
    id: "12",
    name: "International Warehouse Logistics Association (IWLA)",
    category: "Industrial",
    memberCount: "North America",
    location: "North America",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    website: "iwla.com",
    fitScore: 3,
    status: "Not Contacted",
    notes: "",
    lastContacted: "",
    priority: "other",
  },
  {
    id: "13",
    name: "IFMA Toronto & South-Central Ontario",
    category: "Industrial",
    memberCount: "Facility managers",
    location: "Toronto / South-Central Ontario",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    website: "ifma-toronto.org",
    fitScore: 3,
    status: "Not Contacted",
    notes: "",
    lastContacted: "",
    priority: "other",
  },
  {
    id: "14",
    name: "Retail Council of Canada (RCC)",
    category: "Industrial",
    memberCount: "National",
    location: "National",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    website: "retailcouncil.org",
    fitScore: 2,
    status: "Not Contacted",
    notes: "",
    lastContacted: "",
    priority: "other",
  },
  {
    id: "15",
    name: "LiUNA Local 527 Ottawa",
    category: "Union",
    memberCount: "Construction labourers",
    location: "Ottawa",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    website: "liunalocal527.com",
    fitScore: 4,
    status: "Not Contacted",
    notes: "",
    lastContacted: "",
    priority: "other",
  },
  {
    id: "16",
    name: "IBEW Local 586 Ottawa",
    category: "Union",
    memberCount: "~1,600 electricians",
    location: "Ottawa",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    website: "ibew586.org",
    fitScore: 4,
    status: "Not Contacted",
    notes: "",
    lastContacted: "",
    priority: "other",
  },
  {
    id: "17",
    name: "Ottawa Board of Trade",
    category: "Business",
    memberCount: "1,200+",
    location: "Ottawa",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    website: "ottawabot.ca",
    fitScore: 3,
    status: "Not Contacted",
    notes: "",
    lastContacted: "",
    priority: "other",
  },
  {
    id: "18",
    name: "WSIB H&S Excellence Program",
    category: "Government",
    memberCount: "Premium rebates for enrolled businesses",
    location: "Province-wide",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    website: "wsib.ca",
    fitScore: 4,
    status: "Not Contacted",
    notes: "",
    lastContacted: "",
    priority: "other",
  },
];

export const SEED_EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Mike Thompson",
    position: "Construction Worker",
    company: "Ottawa Builds Inc.",
    certifications: [
      { id: "c1", name: "Working at Heights", status: "Valid", issueDate: "2025-06-15", expiryDate: "2028-06-15" },
      { id: "c2", name: "WHMIS", status: "Expiring Soon", issueDate: "2023-09-01", expiryDate: "2026-09-01" },
      { id: "c3", name: "Construction Awareness (4-Step)", status: "Valid", issueDate: "2025-01-10", expiryDate: "2028-01-10" },
    ],
  },
  {
    id: "2",
    name: "Sarah Chen",
    position: "Supervisor",
    company: "Ottawa Builds Inc.",
    certifications: [
      { id: "c4", name: "Supervisor Awareness", status: "Valid", issueDate: "2025-03-20", expiryDate: "2028-03-20" },
      { id: "c5", name: "WHMIS", status: "Valid", issueDate: "2025-03-20", expiryDate: "2028-03-20" },
      { id: "c6", name: "Working at Heights", status: "Expired", issueDate: "2022-05-10", expiryDate: "2025-05-10" },
      { id: "c7", name: "JHSC Certification", status: "Not Started", issueDate: "", expiryDate: "" },
    ],
  },
  {
    id: "3",
    name: "James Wilson",
    position: "Forklift Operator",
    company: "Capital Logistics",
    certifications: [
      { id: "c8", name: "Forklift Certification", status: "Valid", issueDate: "2025-01-15", expiryDate: "2028-01-15" },
      { id: "c9", name: "WHMIS", status: "Valid", issueDate: "2024-11-01", expiryDate: "2027-11-01" },
    ],
  },
  {
    id: "4",
    name: "Priya Patel",
    position: "Electrician",
    company: "Volt Electric Services",
    certifications: [
      { id: "c10", name: "Working at Heights", status: "Valid", issueDate: "2025-02-28", expiryDate: "2028-02-28" },
      { id: "c11", name: "WHMIS", status: "Expiring Soon", issueDate: "2023-04-15", expiryDate: "2026-04-15" },
      { id: "c12", name: "Confined Space", status: "Expired", issueDate: "2022-08-20", expiryDate: "2025-08-20" },
      { id: "c13", name: "Supervisor Awareness", status: "Not Started", issueDate: "", expiryDate: "" },
    ],
  },
  {
    id: "5",
    name: "David Okafor",
    position: "Warehouse Worker",
    company: "Capital Logistics",
    certifications: [
      { id: "c14", name: "Forklift Certification", status: "Expiring Soon", issueDate: "2023-07-10", expiryDate: "2026-07-10" },
      { id: "c15", name: "WHMIS", status: "Valid", issueDate: "2025-01-05", expiryDate: "2028-01-05" },
      { id: "c16", name: "Hoisting and Rigging", status: "Not Started", issueDate: "", expiryDate: "" },
    ],
  },
];

// localStorage helpers
const PARTNERSHIPS_KEY = "2ns_partnerships";
const EMPLOYEES_KEY = "2ns_employees";

export function getPartnerships(): Partnership[] {
  if (typeof window === "undefined") return SEED_PARTNERSHIPS;
  const stored = localStorage.getItem(PARTNERSHIPS_KEY);
  if (!stored) {
    localStorage.setItem(PARTNERSHIPS_KEY, JSON.stringify(SEED_PARTNERSHIPS));
    return SEED_PARTNERSHIPS;
  }
  return JSON.parse(stored);
}

export function savePartnerships(data: Partnership[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PARTNERSHIPS_KEY, JSON.stringify(data));
}

export function getEmployees(): Employee[] {
  if (typeof window === "undefined") return SEED_EMPLOYEES;
  const stored = localStorage.getItem(EMPLOYEES_KEY);
  if (!stored) {
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(SEED_EMPLOYEES));
    return SEED_EMPLOYEES;
  }
  return JSON.parse(stored);
}

export function saveEmployees(data: Employee[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(data));
}
