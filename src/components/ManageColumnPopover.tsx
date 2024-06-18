import { FiColumns } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { headers } from "@/data/tableHeaders";
import { Dispatch, SetStateAction, useRef, useState } from "react";

export const ManageColumnPopover = ({
  setVisibleHeaders,
}: {
  setVisibleHeaders: Dispatch<SetStateAction<number[]>>;
}) => {
  const popoverRef = useRef<HTMLButtonElement>(null);
  const [checkedHeaders, setCheckedHeaders] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7,
  ]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button ref={popoverRef}>
          <FiColumns />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] max-h-[472px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-[#000000] text-base">
              Edit Columns
            </h4>
            <p className="text-xs text-[#334155]">
              Select the columns to rearrange
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 max-h-[324px] overflow-auto my-3">
                {headers.map((column) => (
                  <div key={column.id} className="flex items-center gap-2">
                    <input
                      checked={checkedHeaders.includes(column.id)}
                      type="checkbox"
                      className="accent-black w-[12px] h-[12px]"
                      onChange={(e) => {
                        if (e.target.checked) {
                          const h = [...checkedHeaders, column.id];
                          setCheckedHeaders(h);
                        } else {
                          const h = checkedHeaders.filter(
                            (it) => it !== column.id
                          );
                          setCheckedHeaders(h);
                        }
                      }}
                    />
                    <div className="w-full py-2 px-3 border border-[#E2E8F0] text-sm font-medium text-[#334155] rounded-md">
                      {column.name}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCheckedHeaders([1, 2, 3, 4, 5, 6, 7])}
                  className="w-full rounded-md text-sm font-medium text-[#0F172A] px-1 border border-[#E2E8F0] bg-[#F4F4F5]"
                >
                  Reset To Default
                </button>
                <button
                  onClick={() => {
                    setVisibleHeaders(checkedHeaders);
                    popoverRef?.current?.click();
                  }}
                  className="w-full rounded-md text-sm bg-[#0F172A] text-[#FFFFFF] py-1 px-3 border border-[#E2E8F0]"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
