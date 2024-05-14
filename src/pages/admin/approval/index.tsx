import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Skeleton } from "@/components/common";
import { Alert } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { lecturerRegistrationService } from "@/services";
import RegistrationCard from "./RegistrationCard";

const AdminApprovalPage: React.FC = () => {
  const { t } = useTranslation();

  // #region Form
  const [page] = useState<number>(0);

  const {
    isLoading,
    data: registrationForms,
    isError,
  } = useQuery({
    queryKey: ["admin", "registrationForms", { page }],
    queryFn: async () => {
      const res = await lecturerRegistrationService.getList(page);
      return res.data;
    },
    initialData: [],
  });
  // #endregion

  if (isError) return <div>Something error...</div>;

  return (
    <main>
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t("admin.Home")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Approval Lecturer Registration</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="text-4xl">Approval Lecturer Registration Form</p>

      {isLoading && <Skeleton />}
      {!isLoading && (
        <div className="flex gap-4">
          {registrationForms?.length === 0 && (
            <div className="w-full gap-4">
              <Alert>There're no registration form for lecturer</Alert>
            </div>
          )}
          {registrationForms.map((form) => (
            <React.Fragment key={form.id}>
              <RegistrationCard
                form={form}
                // setRegistrationForms={setRegistrationForms}
                registrationForms={registrationForms}
              />
            </React.Fragment>
          ))}
        </div>
      )}
    </main>
  );
};

export default AdminApprovalPage;
