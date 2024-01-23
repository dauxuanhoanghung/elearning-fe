import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { createBrowserRouter, useRoutes } from "react-router-dom";

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
    </QueryClientProvider>
  );
}

export default App;
