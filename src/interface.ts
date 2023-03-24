export interface TagData {
  label: string;
  value: string;
  category: number | string;
}

export interface TagStatusData {
  active: boolean;
  pow: number;
  rate: number;
  kagi?: boolean;
}
