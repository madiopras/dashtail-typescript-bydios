"use client"
import LocationForm from "@/app/[lang]/components/form/locations/locationform";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import Card from "@/components/ui/card-snippet";
const UserRolePage = () => {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Bus System</BreadcrumbItem>
        <BreadcrumbItem>Master</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Create Location</BreadcrumbItem>
      </Breadcrumbs>
      <div className="space-y-10 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <Card title="Create Location">
            <LocationForm/>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserRolePage;