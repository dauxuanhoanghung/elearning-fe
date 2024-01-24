import Pagination from "@/components/common/Pagination";
import Skeleton from "@/components/common/Skeleton";
import DefaultLayout from "@/layout/DefaultLayout";
import { NotFoundPage } from "@/pages/errors";
import AdminRouter from "./AdminRouter";
import ClientRouter from "./ClientRouter";

export const routers = [
  ...ClientRouter,
  ...AdminRouter,
  {
    path: "/test",
    element: (
      <DefaultLayout>
        <Pagination page={8} totalPage={10} />
        <Skeleton />
        <Skeleton isRow={false} />
      </DefaultLayout>
    ),
  },
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
