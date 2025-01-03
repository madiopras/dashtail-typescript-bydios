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

const stateOptions = [
  { value: "", label: "All" },
  { value: "Sumatera Utara", label: "Sumatera Utara" },
  { value: "Sumatera Barat", label: "Sumatera Barat" },
  { value: "Sumatera Selatan", label: "Sumatera Selatan" },
  { value: "Aceh", label: "Aceh" },
  { value: "Riau", label: "Riau" },
  { value: "Jambi", label: "Jambi" },
  { value: "Lampung", label: "Lampung" },
  { value: "Bengkulu", label: "Bengkulu" },
];


const styles = {
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const FilterLocationDialog = ({ onFilter }: { onFilter: (filters: any) => void }) => {
  // State untuk menyimpan nilai filter
  const [name, setName] = useState("");
  const [state, setState] = useState("");

  // Fungsi untuk mengirimkan filter ke parent component
  const handleFilter = () => {
    const filters = {
      name,
      state,
    };
    onFilter(filters); // Kirim data filter ke parent
  };

  // Fungsi untuk mereset semua filter
  const handleReset = () => {
    setName("");
    setState("");
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
              <Label htmlFor="gender">Provinsi</Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                value={stateOptions.find((g) => g.value === state)}
                onChange={(selected) => setState(selected?.value || "")}
                options={stateOptions}
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

export default FilterLocationDialog;
