import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Alert, Box, Grid } from "@mui/material";

import { Skeleton } from "@/components/common";
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
  } = useQuery(["admin", "registrationForms", page], async () => {
    const res = await lecturerRegistrationService.getAllForms(page);
    return res.data;
  });

  useEffect(() => {
    setPage(0); // Reset page when component mounts or page changes
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
        <>
          <Grid container>
            {registrationForms?.length === 0 && (
              <>
                <Box container sx={{ margin: "30px", width: "100%" }}>
                  <Alert severity="info" sx={{ width: "100%" }}>
                    There are no registration form !!!
                  </Alert>
                </Box>
              </>
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
          </Grid>
        </>
      )}
    </main>
  );
};

export default AdminApprovalPage;
