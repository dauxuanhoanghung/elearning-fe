import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import AppProvider from "./contexts";
import { routers } from "./routes";

function App() {
  const element = useRoutes(routers);

  return (
    <AppProvider>
      <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
    </AppProvider>
  );
}

export default App;
