
import {
  DashBoard,
  Files,
  Graph,
  ClipBoard,
  Cart,
  ListFill,
  User,
  UserPlus,
  Calender,
  Settings,
  List,
  Location,
} from "@/components/svg";
import { Bus, BusFront, PackageCheck } from "lucide-react";


export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu? : MenuItemProps[]
  nested?: MenuItemProps[]
  onClick: () => void;
}

export const menusConfig = {
  
  sidebarNav: {
    modern: [
      {
        title: "Dashboard",
        icon: DashBoard,
        child: [
          {
            title: "Analytics",
            href: "/dashboard",
            icon: Graph,
          },
          {
            title: "Ecommerce",
            href: "/ecommerce",
            icon: Cart,
          },
        ],
      },
      {
        title: "Bus System",
        icon: BusFront,
        child: [
          {
            title: "Booking",
            href: "/admin/bus/booking",
            icon: Bus,
          },
          {
            title: "Order",
            href: "/admin/bus/order",
            icon: List,
          },
          {
            title: "Schedule Bus",
            href: "/admin/bus/schebus",
            icon: Calender,
          },
          {
            title: "Schedule Rute",
            href: "/admin/bus/scherute",
            icon: Location,
          },
          {
            title: "Master",
            icon: Files,
            nested: [
              {
                title: "Bus",
                icon: ClipBoard,
                href: "/admin/bus/master/busses",
              },
              {
                title: "Class Bus",
                icon: ClipBoard,
                href: "/admin/bus/master/classes",
              },
              {
                title: "Location",
                icon: ClipBoard,
                href: "/admin/bus/master/location",
              },
              {
                title: "Route",
                icon: ClipBoard,
                href: "/admin/bus/master/route",
              },
              {
                title: "Special Days",
                icon: ClipBoard,
                href: "/admin/bus/master/specday",
              },
            ],
          },
        ],
      },
      {
        title: "Delivery System",
        icon: PackageCheck,
        child: [
          {
            title: "Delivery",
            href: "/kirimbarang",
            icon: Graph,
          },
          {
            title: "Tracking",
            href: "/order",
            icon: Graph,
          },
          {
            title: "Manage Price",
            href: "/schedule",
            icon: Cart,
          },
        ],
      },
      {
        title: "User Management",
        icon: User,
        child: [
          {
            title: "User List",
            href: "/admin/users/user",
            icon: UserPlus,
          },
          {
            title: "Role",
            href: "/admin/users/role",
            icon: ListFill,
          },
          {
            title: "Permissions",
            href: "/admin/users/permissions",
            icon: ListFill,
          },
        ],
      },
      {
        title: "Setting",
        icon: Settings,
        child: [
          {
            title: "Connection",
            href: "/admin/setting/connection",
            icon: Graph,
          },
          {
            title: "Payment Method",
            href: "/admin/setting/payment",
            icon: Graph,
          },
        ],
      },
    ],
   
  },
};


export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number]