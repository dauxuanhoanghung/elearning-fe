import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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
import { useSnackbar } from "@/contexts/SnackbarContext";
import { lecturerRegistrationService } from "@/services";
import RegistrationCard from "./RegistrationCard";

const AdminApprovalPage = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // #region Form
  const [page, setPage] = useState(0);

  const {
    isLoading,
    data: registrationForms,
    error,
  } = useQuery({
    queryKey: ["admin", "registrationForms", { page }],
    queryFn: async () => {
      const res = await lecturerRegistrationService.getList(page);
      return res.data;
    },
  });

  useEffect(() => {
    setPage(0);
  }, [page]);
  // #endregion
  return (
    <main>
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
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
        <div className="flex">
          {registrationForms?.length === 0 && (
            <div className="w-full gap-4">
              <Alert>There're no registration form for lecturer</Alert>
            </div>
          )}
          {registrationForms.map((form) => (
            <React.Fragment key={form.id}>
              <RegistrationCard
                form={form}
                setRegistrationForms={setRegistrationForms}
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
