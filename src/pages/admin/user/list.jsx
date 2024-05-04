import { useQuery } from "@tanstack/react-query";

import { UserTable } from "@/components/admin/users";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { userService } from "@/services";

const AdminListUserPage = () => {
  const { data: count, countLoading } = useQuery({
    queryKey: ["users", "count"],
    queryFn: async () => {
      const res = await userService.count();
      if (res.status === 200) return res.data;
      return 0;
    },
    initialData: 0,
  });

  return (
    <main className="container" data-component="admin-list-users-page">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Users</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <p className="text-4xl">Users ({count + ""})</p>
      </div>
      <div data-role="table-users">
        <UserTable userCount={count} />
      </div>
    </main>
  );
};

export default AdminListUserPage;
