"use client"
import UserForm from "@/app/[lang]/components/form/userform";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import Card from "@/components/ui/card-snippet";
const UserRolePage = () => {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>User Management</BreadcrumbItem>
        <BreadcrumbItem>User List</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Create User</BreadcrumbItem>
      </Breadcrumbs>
      <div className="space-y-10 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <Card title="Create User">
            <UserForm/>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserRolePage;