import { useFormContext } from "react-hook-form";
import FormInput from "./FormInput";
import { FormMessage } from "./ui/form";
import { waitListAPIResponse } from "../../types";
import { FaSearch } from "react-icons/fa";

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
  const { register, watch } = useFormContext();
  const selectedServices = watch("selectedServices") || [];

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
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
};
