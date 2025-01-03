import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ActionButton from "../button/actionbutton";
import StdPagination from "../pagination/pagistd";
import ConfirmDialog from "../dialog/confirm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";

interface Location {
  id: number;
  name: string;
  state: string;
  place: string;
  address: string;
}

interface LocationTableProps {
  locations: Location[];
  page: number;
  totalPages: number;
  totalItems: number;
  handleUpdate: (id: number) => void;
  handleView: (id: number) => void;
  confirmDelete: (id: number) => void;
  handlePageChange: (page: number) => void;
}

const LocationTable: React.FC<LocationTableProps> = ({
  locations,
  page,
  totalPages,
  totalItems,
  handleUpdate,
  handleView,
  confirmDelete,
  handlePageChange,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const openConfirmDialog = (location: Location) => {
    setSelectedLocation(location);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedLocation) {
      confirmDelete(selectedLocation.id);
    }
    setDialogOpen(false);
    setSelectedLocation(null);
  };

  const columns = [ 
    { key: "no", label: "No." },
    { key: "name", label: "Lokasi" },
    { key: "state", label: "Provinsi" },
    { key: "place", label: "Tempat" },
    { key: "address", label: "Alamat" },
    { key: "action", label: "Action" },
  ];

  return (
    <>
      <Card className="mb-4">
        <Table> 
          <TableHeader>
            <TableRow>
            {columns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
          {locations.map((location, index) => ( 
            <TableRow key={location.id} className="hover:bg-default-100">
              <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
              <TableCell>{location.name}</TableCell>
              <TableCell className="capitalize">{location.state}</TableCell>
              <TableCell>{location.place}</TableCell>
              <TableCell>{location.address}</TableCell>
              <TableCell className="flex gap-3  justify-end">
              <ActionButton
                    variant="edit"
                    onClick={() => handleUpdate(location.id)}
                  />
                  <ActionButton
                    variant="view"
                    onClick={() => handleView(location.id)}
                  />
                  <ActionButton
                    variant="delete"
                    onClick={() => openConfirmDialog(location)}
                  />
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
        <Label className="ml-4 mb-4">Total Lokasi : {totalItems}</Label>
      </Card>
      <StdPagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />

      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Apakah anda yakin untuk menghapus data ${selectedLocation?.name}?`}
      />
    </>
  );
};

export default LocationTable;
