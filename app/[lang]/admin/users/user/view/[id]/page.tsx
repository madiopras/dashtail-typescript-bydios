"use client"
import UserFormView from "@/app/[lang]/components/form/userformview";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import Card from "@/components/ui/card-snippet";
const UserPageView = () => {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>User Management</BreadcrumbItem>
        <BreadcrumbItem>User List</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">View User</BreadcrumbItem>
      </Breadcrumbs>
      <div className="space-y-10 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <Card title="View User">
            <UserFormView/>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserPageView;