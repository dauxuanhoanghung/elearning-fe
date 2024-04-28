import { useQuery } from "@tanstack/react-query";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { userService } from "@/services";

const AdminListInvoicesPage = () => {
  const { data: invoices, isLoading: userLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await userService.getAll();
      return res.data;
    },
    initialData: [],
  });

  return (
    <main className="container" data-component="admin-list-invoices-page">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Invoices</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <p className="text-4xl">Invoices</p>
      </div>
      <div data-role="table-users"></div>
    </main>
  );
};

export default AdminListInvoicesPage;
