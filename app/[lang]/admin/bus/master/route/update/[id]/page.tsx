"use client"
import UserFormUpdate from "@/app/[lang]/components/form/userformupdate";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import Card from "@/components/ui/card-snippet";
const UserPageUpdate = () => {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>User Management</BreadcrumbItem>
        <BreadcrumbItem>User List</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Update User</BreadcrumbItem>
      </Breadcrumbs>
      <div className="space-y-10 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <Card title="Update User">
            <UserFormUpdate/>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserPageUpdate;