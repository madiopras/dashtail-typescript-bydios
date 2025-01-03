"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

const UserForm = () => {
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

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman

    // Validasi input
    if (!user.name || !user.email || !user.phone_number || !user.gender || !user.password || !user.role) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true); // Set loading state
    try {
      // Ambil sesi pengguna
      const session = await getSession();
      if (!session) {
        toast.error("Session expired. Redirecting to login...");
        signOut();
        return;
      }

      // Kirim data ke API
      const create_by_id = session.accessToken; // Ambil ID pengguna dari sesi
      await apiClient.post("/api/admin/users", { ...user, create_by_id });
      // Redirect ke halaman daftar pengguna
      router.push("/admin/users/user");
      toast.success("User created successfully!");
    } catch (error: any) {
      // Tangani error
      console.error("Error creating user:", error);
      toast.error("Failed to create user. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Fungsi untuk menangani perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  // Fungsi untuk menangani perubahan pada Select
  const handleSelectChange = (name: string, value: string) => {
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  // Fungsi untuk membatalkan dan kembali ke halaman sebelumnya
  const handleCancel = () => {
    router.push("/admin/users/user");
  };

  return (
    <form onSubmit={handleSubmit}>
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
              onChange={handleChange}
              required
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
              onChange={handleChange}
              required
            />
          </InputGroup>
        </div>

        <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={user.gender}
            onValueChange={(value) => handleSelectChange("gender", value)}
            required
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
              onChange={handleChange}
              required
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
              onChange={handleChange}
              required
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
            onValueChange={(value) => handleSelectChange("role", value)}
            required
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Simpan"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
