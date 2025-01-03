"use client"
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
const UserRolePage = () => {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Bus System</BreadcrumbItem>
        <BreadcrumbItem>Master</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">User Role</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5 text-2xl font-medium text-default-900">Blank Page</div>
    </div>
  );
};

export default UserRolePage;