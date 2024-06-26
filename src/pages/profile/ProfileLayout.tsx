import React from "react";

import Sidebar from "@/components/Profiles/Sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslation } from "react-i18next";

interface ProfileLayoutProps {
  children: React.ReactNode;
  title: string;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children, title }) => {
  const { t } = useTranslation();

  return (
    <main className="w-full md:container" data-role="profile-layout">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t("common.home")}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex h-fit flex-row">
        <Sidebar />
        <div className="mx-auto w-full flex-col justify-center border-l border-black dark:border-gray-50">
          <div className="my-4 justify-center md:flex">
            <h4 className="text-2xl">{title}</h4>
          </div>
          <main className="w-full" data-role="profile-children">
            {children}
          </main>
        </div>
      </div>
    </main>
  );
};

export default ProfileLayout;
