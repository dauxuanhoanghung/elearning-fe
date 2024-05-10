import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";

import AppProvider from "./contexts";
import { routers } from "./routes";

// Create a client
const queryClient = new QueryClient();

function App() {
  const element = useRoutes(routers);

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
