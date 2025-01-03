"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import FilterUserDialog from "@/app/[lang]/components/dialog/filter-user";
import UserTable from "@/app/[lang]/components/tables/usertable";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card-snippet";
import { handleError } from "@/lib/utils";
import apiClient from "@/lib/axios";
import toast from "react-hot-toast";
import {LucidePlusCircle } from "lucide-react";
import Loading from "./loading";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState({});
  const router = useRouter();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/api/admin/users", {
        params: { page, limit: 10, ...filters },
      });

      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
      setTotalItems(response.data.total_items);
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        handleError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters); // Perbarui filter
    setPage(1); // Reset ke halaman pertama
  };


  useEffect(() => {
    fetchUsers();
  }, [page, fetchUsers]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const confirmDelete = async (id: number) => {
    try {

      await apiClient.delete(`/api/admin/users/${id}`);
      toast.success("User deleted successfully");
      fetchUsers(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete user");
      handleError(error);
    }
  };

  const handleAddUser = () => {
    // Redirect to add user page
    router.push("/admin/users/user/create");
  };

  const handleUpdate = (id: number) => {
    // Redirect to update user page
    router.push(`/admin/users/user/update/${id}`);
  };

  const handleView = (id: number) => {
    // Redirect to view user details
    router.push(`/admin/users/user/view/${id}`);
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>User Management</BreadcrumbItem>
        <BreadcrumbItem>User</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">User List</BreadcrumbItem>
      </Breadcrumbs>
      <div className="space-y-10 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <Card title="List User">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex-1">
                <FilterUserDialog onFilter={handleFilter} />
              </div>
              <div className="flex-none">
                <Button type="button" onClick={handleAddUser}>
                  <LucidePlusCircle className="mr-2"/> Add User
                </Button>
              </div>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <UserTable
                users={users}
                page={page}
                totalPages={totalPages}
                totalItems={totalItems}
                handleUpdate={handleUpdate}
                handleView={handleView}
                confirmDelete={confirmDelete}
                handlePageChange={handlePageChange}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
