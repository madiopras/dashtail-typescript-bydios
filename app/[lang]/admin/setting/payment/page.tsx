"use client"
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
const PayMetPage = () => {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Bus System</BreadcrumbItem>
        <BreadcrumbItem>Setting</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Payment Method</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5 text-2xl font-medium text-default-900">Blank Page</div>
    </div>
  );
};

export default PayMetPage;