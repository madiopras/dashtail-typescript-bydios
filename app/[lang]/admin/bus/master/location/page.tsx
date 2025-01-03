"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card-snippet";
import { handleError } from "@/lib/utils";
import apiClient from "@/lib/axios";
import toast from "react-hot-toast";
import {LucidePlusCircle } from "lucide-react";
import Loading from "./loading";
import LocationTable from "@/app/[lang]/components/tables/locationtable";
import FilterLocationDialog from "@/app/[lang]/components/dialog/filter-location";

const LocationPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState({});
  const router = useRouter();

  const fetchlocations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/api/admin/locations", {
        params: { page, limit: 10, ...filters },
      });

      setLocations(response.data.data);
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
    fetchlocations();
  }, [page, fetchlocations]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const confirmDelete = async (id: number) => {
    try {

      await apiClient.delete(`/api/admin/locations/${id}`);
      toast.success("Location deleted successfully");
      fetchlocations(); // Refresh data
    } catch (error) {
      toast.error("Failed to delete Location");
      handleError(error);
    }
  };

  const handleAddUser = () => {
    // Redirect to add user page
    router.push("/admin/bus/master/location/create");
  };

  const handleUpdate = (id: number) => {
    // Redirect to update user page
    router.push(`/admin/locations/user/update/${id}`);
  };

  const handleView = (id: number) => {
    // Redirect to view user details
    router.push(`/admin/locations/user/view/${id}`);
  };

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Bus System</BreadcrumbItem>
        <BreadcrumbItem>Master</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Location List</BreadcrumbItem>
      </Breadcrumbs>
      <div className="space-y-10 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <Card title="List Location">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex-1">
                <FilterLocationDialog onFilter={handleFilter} />
              </div>
              <div className="flex-none">
                <Button type="button" onClick={handleAddUser}>
                  <LucidePlusCircle className="mr-2"/> Add Location
                </Button>
              </div>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <LocationTable
                locations={locations}
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

export default LocationPage;
