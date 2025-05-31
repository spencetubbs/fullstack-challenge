import { api } from "./app.api"
import { DealsByStatus } from "./deal.types";

export const getDealsByOrganization = async (organizationId: number): Promise<DealsByStatus[]> => {
  const { data } = await api.get(`/deals/${organizationId}`)

  // This assumes that the data is returned from the api in the correct format.
  // Consider adding validation/data transformation
  return data.data as DealsByStatus[];
}
