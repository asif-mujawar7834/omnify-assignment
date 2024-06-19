import { useFormContext } from "react-hook-form";
import FormInput from "./FormInput";
import { FormMessage } from "./ui/form";
import { waitListAPIResponse } from "../../types";
import { FaSearch } from "react-icons/fa";
import Dropdown from "./Dropdown";
import { serviceStatus, serviceTypes } from "@/data/DropdownData";

export const ServicesFilter = ({
  filteredData,
  debouncedValue,
}: {
  filteredData: waitListAPIResponse;
  debouncedValue: string;
}) => {
  const statusClass = (status: string): { text: string; bg: string } => {
    let text = "";
    let bg = "";
    switch (status) {
      case "private":
        text = "text-[#BF8000]";
        bg = "bg-[#EFF6FF]";
        break;
      case "public":
        text = "text-[#15803D]";
        bg = "bg-[#EFF6FF]";
        break;
    }
    return {
      text,
      bg,
    };
  };

  const {
    control,
    formState: { errors },
    register,
    watch,
  } = useFormContext();
  const selectedServices = watch("selectedServices") || [];

  const serviceFilterType = watch("serviceFilterType");

  const filterByName = (
    <div>
      <FormInput
        placeholder="Search Service Name"
        type="text"
        name="serviceSearchTerm"
        control={control}
        error={errors.serviceSearchTerm?.message as string}
        required={true}
        icon={<FaSearch />}
      />
      <div>
        {debouncedValue && (
          <label className="text-[#0F172A] text-xs my-2 block">
            Showing {filteredData?.data?.length} results for matching{" "}
            {<span>‘{debouncedValue}’</span>}
          </label>
        )}
        <ul className="flex flex-col gap-1 my-2">
          {filteredData?.data?.map((person) => {
            const { text, bg } = statusClass(person.service.status);
            return (
              <li key={person.id}>
                <div className="text-[#374151] text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={person.id}
                      {...register("selectedServices")}
                      className="accent-black cursor-pointer"
                      checked={selectedServices.includes(person.id.toString())}
                    />
                    {person.service.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="border-md text-[#334155] py-1 px-2 text-[10px] font-medium bg-[#F1F5F9]">
                      {person.service.type}
                    </span>
                    <span
                      className={`border-md ${bg} ${text} py-1 px-2 text-[10px] font-medium`}
                    >
                      {person.service.status}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {errors.selectedServices && (
          <FormMessage className="text-xs">
            {errors.selectedServices?.message as string}
          </FormMessage>
        )}
      </div>
    </div>
  );

  const filterByTags = (
    <div className="flex flex-col gap-4">
      <Dropdown
        label="Service Type"
        items={serviceTypes}
        selected={"Show All Service Types"}
      />
      <Dropdown label="Status" items={serviceStatus} selected={"Show All"} />
      <p className="text-yellow-500 text-xs">
        This feature is work in progress.
      </p>
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-4 mb-6 text-[#334155] text-sm">
        <label className="flex items-center gap-2 w-full">
          <input
            type="radio"
            value="byname"
            {...register("serviceFilterType")}
            checked={serviceFilterType === "byname"}
            className="accent-black cursor-pointer"
          />
          Search by name
        </label>
        <label className="flex items-center gap-2 w-full">
          <input
            type="radio"
            value="bytags"
            {...register("serviceFilterType")}
            checked={serviceFilterType === "bytags"}
            className="accent-black  cursor-pointer"
          />
          Search by tags
        </label>
      </div>
      {serviceFilterType === "byname" ? filterByName : filterByTags}
    </div>
  );
};
