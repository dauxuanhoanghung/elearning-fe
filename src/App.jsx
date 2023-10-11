import { Suspense, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import { routers } from "./routes";
import AppProvider from "./contexts";
import { useDispatch } from "react-redux";
import { loadFromLocalStorage, setUser } from "./app/store/user/userSlice";
import { userService } from "./services";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const element = useRoutes(routers);
  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch the action to load data from localStorage
    dispatch(loadFromLocalStorage())
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <AppProvider>
        <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
      </AppProvider>
    </>
  );
}

export default App;
