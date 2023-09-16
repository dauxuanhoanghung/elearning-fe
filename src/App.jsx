import { Suspense, useState } from "react";
import { useRoutes } from "react-router-dom";
import { routers } from "./routes";
import "./App.css";
import AppProvider from "./contexts";
function App() {
  const element = useRoutes(routers);
  return (
    <>
      <AppProvider>
        <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
      </AppProvider>
    </>
  );
}

export default App;
