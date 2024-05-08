import DefaultLayout from "@/layout/DefaultLayout";
import { NotFoundPage } from "@/pages/errors";
import AdminRouter from "./AdminRouter";
import ClientRouter from "./ClientRouter";

export const routers = [
  ...ClientRouter,
  ...AdminRouter,
  {
    path: "*",
    exact: false,
    element: (
      <DefaultLayout>
        <NotFoundPage />
      </DefaultLayout>
    ),
  },
];
