"use client";
import { useState, useEffect, useCallback  } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import apiClient from "@/lib/axios"; // Pastikan Anda memiliki instance axios

const UserFormView = () => {
  // State untuk menyimpan nilai input form
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone_number: "",
    gender: "",
    password: "",
    role: "",
    is_active: true,
  });
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();


  const fetchUser = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await apiClient.get(`/api/admin/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Fungsi untuk membatalkan dan kembali ke halaman sebelumnya
  const handleCancel = () => {
    router.push("/admin/users/user");
  };

  return (
    <form>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex flex-col gap-2">
          <Label htmlFor="viFullName3">Full Name</Label>
          <InputGroup merged>
            <InputGroupText>
              <Icon icon="mdi:user" />
            </InputGroupText>
            <Input
              type="text"
              placeholder="Your name"
              id="viFullName3"
              name="name"
              value={user.name}
              disabled
            />
          </InputGroup>
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
          <Label htmlFor="viPhone3">Phone Number</Label>
          <InputGroup merged className="flex">
            <InputGroupText>
              <Icon icon="tdesign:call" />
            </InputGroupText>
            <Input
              type="number"
              placeholder="Type number"
              id="viPhone3"
              name="phone_number"
              value={user.phone_number}
              disabled
            />
          </InputGroup>
        </div>

        <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={user.gender}
            disabled
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pria">Pria</SelectItem>
              <SelectItem value="wanita">Wanita</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <Label htmlFor="viEmail3">Email Address</Label>
          <InputGroup merged>
            <InputGroupText>
              <Icon icon="ic:outline-email" />
            </InputGroupText>
            <Input
              type="email"
              placeholder="Your email"
              id="viEmail3"
              name="email"
              value={user.email}
              disabled
            />
          </InputGroup>
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
          <Label htmlFor="viPassword3">Password</Label>
          <InputGroup merged>
            <InputGroupText>
              <Icon icon="material-symbols:lock-outline" />
            </InputGroupText>
            <Input
              type="password"
              placeholder="Type password"
              id="viPassword3"
              name="password"
              value={user.password}
              disabled
            />
            <InputGroupText>
              <Icon icon="basil:eye-closed-solid" />
            </InputGroupText>
          </InputGroup>
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
          <Label htmlFor="role">Role</Label>
          <Select
            value={user.role}
            disabled
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="kasir">Kasir</SelectItem>
              <SelectItem value="admincab">Admin Cabang</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="supir">Supir</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <Button
            type="button"
            onClick={handleCancel}
            color="warning"
            className="mr-4"
          >
            Kembali
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserFormView;
