import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { LucideListFilter } from "lucide-react";

const genderOptions = [
  { value: "", label: "All" },
  { value: "pria", label: "Pria" },
  { value: "wanita", label: "Wanita" },
];

const roleOptions = [
  { value: "", label: "All" },
  { value: "admin", label: "Admin" },
  { value: "supir", label: "Supir" },
  { value: "customer", label: "Customer" },
  { value: "admincab", label: "Admin Cabang" },
];

const styles = {
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const FilterUserDialog = ({ onFilter }: { onFilter: (filters: any) => void }) => {
  // State untuk menyimpan nilai filter
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");

  // Fungsi untuk mengirimkan filter ke parent component
  const handleFilter = () => {
    const filters = {
      name,
      email,
      phone,
      gender,
      role,
    };
    onFilter(filters); // Kirim data filter ke parent
  };

  // Fungsi untuk mereset semua filter
  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setGender("");
    setRole("");
    onFilter({}); // Kirim filter kosong ke parent
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button color="info">
            <LucideListFilter />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter User</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                placeholder="Search Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="Search Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="phone">Mobile Phone</Label>
              <Input
                type="text"
                placeholder="Search Phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                value={genderOptions.find((g) => g.value === gender)}
                onChange={(selected) => setGender(selected?.value || "")}
                options={genderOptions}
                styles={styles}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                value={roleOptions.find((r) => r.value === role)}
                onChange={(selected) => setRole(selected?.value || "")}
                options={roleOptions}
                styles={styles}
              />
            </div>
          </div>

          <DialogFooter className="mt-8 gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" color="warning" onClick={handleReset}>
                Reset
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleFilter}>
              Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilterUserDialog;
