import { useQuery } from "@tanstack/react-query";

import { UserTable } from "@/components/admin/users";
import { columns } from "@/components/admin/users/columns";
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
    queryFn: () => userService.count(),
  });

  const { data: users, isLoading: userLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await userService.getAll();
      return res.data;
    },
    initialData: [],
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
        <p className="text-4xl">Users ({count?.data})</p>
      </div>
      <div data-role="table-users">
        <UserTable data={users} columns={columns} />
      </div>
    </main>
  );
};

export default AdminListUserPage;
