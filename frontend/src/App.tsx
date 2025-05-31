import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DealBoard } from "./pages/DealBoard"

const queryClient = new QueryClient();

export const App: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <DealBoard />
    </QueryClientProvider>
  )
}