export type DealsByStatus = {
  organization_id: number;
  organization: string;
  status: string;
  total_value: number;
  deals: {
    account_id: number;
    account: string;
    value: number;
  }[];
};
