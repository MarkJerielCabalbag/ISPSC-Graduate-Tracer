import { Input } from "../../../components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../components/ui/popover";

interface FilterProps {
  columnFilters: { id: string; value: any }[];
  setColumnFilters: React.Dispatch<
    React.SetStateAction<{ id: string; value: any }[]>
  >;
}

const Filter: React.FC<FilterProps> = ({ columnFilters, setColumnFilters }) => {
  const onFilterChange = (id: string, value: string) =>
    setColumnFilters((prev) =>
      prev.filter((f) => f.id !== id).concat({ id, value })
    );

  const filterStatuses =
    columnFilters.find((f) => f.id === "yearOfGraduation")?.value || "";

  return (
    <div className="flex items-center gap-2 my-5 w-full md:w-auto">
      <Input
        onChange={(e) => onFilterChange("yearOfGraduation", e.target.value)}
        placeholder="Search Year of Graduation"
        value={filterStatuses}
      />
      <Popover>
        <PopoverTrigger className="bg-slate-900 text-white px-5 py-2 rounded-md flex items-center gap-2">
          Filter
        </PopoverTrigger>
        <PopoverContent>
          <h1 className="text-slate-900 font-bold mb-5">Filter By Status:</h1>
          {columnFilters.map((status) => (
            <h1 key={status.id}>{status.value}</h1>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Filter;
