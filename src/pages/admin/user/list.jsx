import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { userService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const AdminListUserPage = () => {
  const { data: count, isLoading } = useQuery({
    queryKey: ["users", "count"],
    queryFn: () => userService.count(),
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
    </main>
  );
};

export default AdminListUserPage;
