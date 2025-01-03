"use client"
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
const OrderPage = () => {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Bus System</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Order</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5 text-2xl font-medium text-default-900">Blank Page</div>
    </div>
  );
};

export default OrderPage;