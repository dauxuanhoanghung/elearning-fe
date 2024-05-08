import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import InvoiceTable from "@/components/admin/invoices/InvoiceTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import registrationService from "@/services/registration.service";

const AdminListInvoicesPage = () => {
  const { t } = useTranslation();

  const { data: count } = useQuery({
    queryKey: ["courses", "count"],
    queryFn: async () => {
      const res = await registrationService.count();
      if (res.status === 200) return res.data;
      return 0;
    },
    initialData: 0,
    staleTime: 60000,
  });

  return (
    <main className="container" data-component="admin-list-invoices-page">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t("admin.Home")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t("admin.invoicePage")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <p className="text-4xl">Invoices ({count + ""})</p>
      </div>
      <div data-role="table-invoices">
        <InvoiceTable />
      </div>
    </main>
  );
};

export default AdminListInvoicesPage;
