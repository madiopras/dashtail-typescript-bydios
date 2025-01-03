"use client";
import { useState } from "react";
import { useRouter} from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import toast from "react-hot-toast";
import apiClient from "@/lib/axios"; // Pastikan Anda memiliki instance axios

const LocationForm = () => {
  // State untuk menyimpan nilai input form
  const [location, setLocation] = useState({
    name: "",
    state: "",
    place: "",
    address: "",
  });
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman

    // Validasi input
    if (!location.name || !location.state || !location.place || !location.address) {
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
      await apiClient.post("/api/admin/locations", { ...location, create_by_id });
      // Redirect ke halaman daftar pengguna
      router.push("/admin/bus/master/location");
      toast.success("location created successfully!");
    } catch (error: any) {
      // Tangani error
      console.error("Error creating location:", error);
      toast.error("Failed to create location. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Fungsi untuk menangani perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation((prevState) => ({ ...prevState, [name]: value }));
  };

  // Fungsi untuk membatalkan dan kembali ke halaman sebelumnya
  const handleCancel = () => {
    router.push("/admin/bus/master/location");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex flex-col gap-2">
          <Label htmlFor="name">Location Name</Label>
          <InputGroup>
            <Input
              type="text"
              placeholder="Location name"
              id="name"
              name="name"
              value={location.name}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
        <Label htmlFor="state">Provinsi</Label>
          <InputGroup>
            <Input
              type="text"
              placeholder="Nama Provinsi"
              id="state"
              name="state"
              value={location.state}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </div>

        <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
        <Label htmlFor="place">Tempat</Label>
          <InputGroup>
            <Input
              type="text"
              placeholder="Nama Tempat Cth: Terminal/Shelter/Loket"
              id="place"
              name="place"
              value={location.place}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
        <Label htmlFor="address">Alamat</Label>
          <InputGroup>
            <Input
              type="text"
              placeholder="Alamat Lokasi"
              id="address"
              name="address"
              value={location.address}
              onChange={handleChange}
              required
            />
          </InputGroup>
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

export default LocationForm;
