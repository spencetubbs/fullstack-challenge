export interface OrganizationDeal {
  organization_id: number;
  organization: string;
  account_id: number;
  account: string;
  status: string;
  value: number;
  start_date: string;
  end_date: string;
}

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

// This isn't the most efficient way to do this. A query might have been faster.
export const groupDealsByStatus = (deals: OrganizationDeal[]): DealsByStatus[] => {
  // Using a map for quick lookup of statuses a we loop through and group the deals.
  const statusMap = new Map<string, DealsByStatus>();

  for (const deal of deals) {
    // Add status to map if it isn't already there
    if (!statusMap.has(deal.status)) {
      statusMap.set(deal.status, {
        organization_id: deal.organization_id,
        organization: deal.organization,
        status: deal.status,
        total_value: 0,
        deals: [],
      });
    }

    const status = statusMap.get(deal.status)!;

    // Add deal to status object
    status.deals.push({
      account_id: deal.account_id,
      account: deal.account,
      value: deal.value,
    });
  }

  const result: DealsByStatus[] = [];

  // Calculate total value of deals for each status
  for (const status of statusMap.values()) {
    const total = status.deals.reduce((sum, d) => {
      const val = d.value || 0;
      return sum + val;
    }, 0);

    status.total_value = total;
    result.push(status);
  }

  return result;
}
