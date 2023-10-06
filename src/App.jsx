import { Suspense, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import { routers } from "./routes";
import AppProvider from "./contexts";
import { useDispatch } from "react-redux";
import { loadFromLocalStorage } from "./app/store/user/userSlice";

function App() {
  const element = useRoutes(routers);
  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch the action to load data from localStorage
    dispatch(loadFromLocalStorage());
    console.log('Loaded data from local')
  }, [dispatch]);
  return (
    <>
      <AppProvider>
        <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
      </AppProvider>
    </>
  );
}

export default App;
