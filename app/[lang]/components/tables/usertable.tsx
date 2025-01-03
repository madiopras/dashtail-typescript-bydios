import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ActionButton from "../button/actionbutton";
import StdPagination from "../pagination/pagistd";
import ConfirmDialog from "../dialog/confirm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";

interface User {
  id: number;
  name: string;
  gender: string;
  email: string;
  phone_number: string;
  role: string;
}

interface UserTableProps {
  users: User[];
  page: number;
  totalPages: number;
  totalItems: number;
  handleUpdate: (id: number) => void;
  handleView: (id: number) => void;
  confirmDelete: (id: number) => void;
  handlePageChange: (page: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  page,
  totalPages,
  totalItems,
  handleUpdate,
  handleView,
  confirmDelete,
  handlePageChange,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openConfirmDialog = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      confirmDelete(selectedUser.id);
    }
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const columns = [ 
    { key: "no", label: "No." },
    { key: "name", label: "Name" },
    { key: "gender", label: "Gender" },
    { key: "email", label: "Email" },
    { key: "mobilep", label: "Mobile Phone" },
    { key: "role", label: "Role" },
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
          {users.map((user, index) => ( 
            <TableRow key={user.id} className="hover:bg-default-100">
              <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell className="capitalize">{user.gender}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell>
              <Badge
                    variant="soft"
                    color={
                      (user.role === "admincab" && "default") ||
                      (user.role === "kasir" && "success") ||
                      (user.role === "supir" && "info") ||
                      (user.role === "admin" && "warning") ||
                      "default"
                    }
                    className="capitalize"
                  >
                    {user.role}
                  </Badge>
              </TableCell>
              <TableCell className="flex gap-3  justify-end">
              <ActionButton
                    variant="edit"
                    onClick={() => handleUpdate(user.id)}
                  />
                  <ActionButton
                    variant="view"
                    onClick={() => handleView(user.id)}
                  />
                  <ActionButton
                    variant="delete"
                    onClick={() => openConfirmDialog(user)}
                  />
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
        <Label className="ml-4 mb-4">Total User : {totalItems}</Label>
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
        message={`Apakah anda yakin untuk menghapus data ${selectedUser?.name}?`}
      />
    </>
  );
};

export default UserTable;
