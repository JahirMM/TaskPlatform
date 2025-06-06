import FilterIcon from "@/icons/FilterIcon";
import XmarkIcon from "@/icons/XmarkIcon";
import { useState } from "react";

interface FilterProjectsProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setFilterType: React.Dispatch<
    React.SetStateAction<"all" | "owned" | "invited">
  >;
  filterType: "all" | "owned" | "invited";
}

function FilterProjects({
  searchTerm,
  setSearchTerm,
  setFilterType,
  filterType,
}: FilterProjectsProps) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="relative flex flex-col w-full gap-2 lg:flex-row lg:items-center lg:gap-4 lg:w-auto">
      <div className="flex items-center w-full gap-2 lg:w-auto lg:justify-end">
        <input
          placeholder="Buscar proyecto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 text-sm text-white border border-action rounded-xl focus:border-action-hover focus:outline focus:outline-action-hover lg:flex-none lg:w-72 xl:w-80"
          aria-label="Buscar proyecto"
        />

        <button
          type="button"
          onClick={() => setShowFilter(!showFilter)}
          className="p-2 text-white rounded-md cursor-pointer bg-action lg:hidden"
        >
          {showFilter ? (
            <XmarkIcon className="text-white size-5" />
          ) : (
            <FilterIcon className="text-white size-5" />
          )}
        </button>
      </div>

      {showFilter && (
        <div className="absolute top-[100%] right-0 mt-2 w-52 bg-surface border border-border rounded-lg p-3 flex flex-col gap-2 shadow-xl lg:hidden z-50">
          {["all", "owned", "invited"].map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => {
                setFilterType(type as "all" | "owned" | "invited");
                setShowFilter(false);
              }}
              className={`px-3 py-2 text-sm rounded-md text-left cursor-pointer ${
                filterType === type
                  ? "bg-action text-white"
                  : "bg-muted text-white hover:bg-muted-hover"
              } hover:bg-action-hover/10`}
            >
              {type === "all"
                ? "Todos"
                : type === "owned"
                ? "Propios"
                : "Invitado"}
            </button>
          ))}
        </div>
      )}

      <div className="hidden gap-2 lg:flex">
        {["all", "owned", "invited"].map((type) => (
          <button
            type="button"
            key={type}
            onClick={() => setFilterType(type as "all" | "owned" | "invited")}
            className={`px-3 py-2 text-sm rounded-md ${
              filterType === type
                ? "bg-action text-white"
                : "bg-muted text-white hover:bg-muted-hover"
            }`}
          >
            {type === "all"
              ? "Todos"
              : type === "owned"
              ? "Propios"
              : "Invitado"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterProjects;
