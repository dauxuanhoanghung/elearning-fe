import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MyBusinessLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [tabs] = useState([
    {
      title: t("business.index-tab"),
      href: "/my-business",
    },
    {
      title: t("business.meet-tab"),
      href: "/my-business/create-room",
    },
  ]);

  const [currentTab] = useState(() => {
    return tabs.find((tab) => tab.href == location.pathname).href;
  });

  const handleNavigateOnTrigger = (href) => {
    navigate(href);
  };

  return (
    <article data-component="course-layout">
      <div className="bg-black text-white dark:bg-white dark:text-black">
        <div className="sm:container">
          <h1 className="py-6 text-4xl font-semibold">
            {t("business.header")}
          </h1>
          <Tabs defaultValue={currentTab} className="w-[400px]">
            <TabsList className="grid h-auto w-full grid-cols-2 bg-black p-0 dark:bg-white">
              {tabs.map((tab, idx) => (
                <TabsTrigger
                  key={idx}
                  value={tab.href}
                  href={tab.href}
                  onClick={() => handleNavigateOnTrigger(tab.href)}
                  className
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </article>
  );
};
export default MyBusinessLayout;
