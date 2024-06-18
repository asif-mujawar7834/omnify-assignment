import { useFormContext } from "react-hook-form";
import FormInput from "./FormInput";
import { FormMessage } from "./ui/form";
import { waitListAPIResponse } from "../../types";
import { FaSearch } from "react-icons/fa";

export const PeoplesFilter = ({
  filteredData,
  debouncedValue,
}: {
  filteredData: waitListAPIResponse;
  debouncedValue: string;
}) => {
  const { register, watch } = useFormContext();
  const selectedPeople = watch("selectedPeople") || [];

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <FormInput
        placeholder="Search Payer or Attendee name"
        type="text"
        name="searchTerm"
        control={control}
        error={errors.searchTerm?.message as string}
        required={true}
        icon={<FaSearch />}
      />
      <div>
        {debouncedValue && (
          <label className="text-[#0F172A] text-xs my-2 block">
            Showing {filteredData.data.length} results for matching{" "}
            {debouncedValue}
          </label>
        )}
        <ul className="flex flex-col gap-2 my-2">
          {filteredData?.data?.map((person) => (
            <li key={person.id}>
              <label className="text-[#374151] text-sm flex items-center gap-2">
                <input
                  type="checkbox"
                  value={person.id}
                  {...register("selectedPeople")}
                  className="accent-black cursor-pointer"
                  checked={selectedPeople?.includes(person.id.toString())}
                />
                {person.payer}
                <span className="border-md text-[#334155] py-1 px-2 text-xs font-medium bg-[#F1F5F9]">
                  Payer
                </span>
              </label>
            </li>
          ))}
        </ul>
        {errors.selectedPeople && (
          <FormMessage>{errors.selectedPeople?.message as string}</FormMessage>
        )}
      </div>
    </div>
  );
};
