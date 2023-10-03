import { Suspense,  useState } from "react";
import { useRoutes } from "react-router-dom";
import { routers } from "./routes";
import AppProvider from "./contexts";
import { store } from "./app/store";
import { Provider } from "react-redux";
function App() {
  const element = useRoutes(routers);
  return (
    <>
      <Provider store={store}>
        <AppProvider>
          <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
        </AppProvider>
      </Provider>
    </>
  );
}

export default App;
