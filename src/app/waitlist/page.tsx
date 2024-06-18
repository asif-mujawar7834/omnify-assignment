"use client";
import { Table } from "@/components/Table";
import { useEffect, useState } from "react";
import { waitListAPIResponse } from "../../../types";
import { FilterPopover } from "@/components/FilterPopover";
import { ManageColumnPopover } from "@/components/ManageColumnPopover";
import { headers } from "@/data/tableHeaders";
import { BsArrowRepeat } from "react-icons/bs";

const defaultState = {
  success: false,
  data: [],
  currentPage: 1,
  totalPages: 1,
  totalRecords: 0,
  limit: 10,
  newRecords: 0,
  leadTotalRecords: 0,
};

export default function WaitList() {
  const [waitlist, setWaitList] = useState<waitListAPIResponse>(defaultState);
  const [isTableFiltered, setIsTableFiltered] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [status, setStatus] = useState("all");
  const [visibleHeaders, setVisibleHeaders] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7,
  ]);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const fetchWaitList = async () => {
    try {
      const urlForDateRange = `/api/waitlist?status=${status}&page=${page}&size=${limit}&startdate=${new Date(
        dateRange.startDate
      )}&enddate=${new Date(dateRange.endDate)}`;
      const normalURL = `/api/waitlist?status=${status}&page=${page}&size=${limit}`;
      const res = await fetch(
        status === "bydaterange" ? urlForDateRange : normalURL
      );
      if (!res.ok) {
        throw new Error("Failed to fetch Waitlist");
      }
      const data = await res.json();
      setWaitList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWaitList();
  }, [page, limit, status]);

  const tableFilterButtons = [
    {
      id: 1,
      name: "All Waitlists",
      value: "all",
      count: waitlist?.totalRecords,
    },
    {
      id: 2,
      name: "Newly Added",
      value: "newlyadded",
      count: waitlist?.newRecords,
    },
    {
      id: 3,
      name: "Leads",
      value: "lead",
      count: waitlist?.leadTotalRecords,
    },
  ];

  const tableHeaders = headers.filter((header) =>
    visibleHeaders.includes(header.id)
  );

  return (
    <div className="text-[#2c333f] font-medium">
      <h1 className="text-[#334155] text-lg font-semibold py-4">WaitList</h1>

      <div className="flex flex-wrap gap-4">
        {tableFilterButtons.map((button) => (
          <button
            onClick={() => {
              setPage(0);
              setIsTableFiltered(false);
              setStatus(button.value);
            }}
            key={button.id}
            className={`text-left flex-shrink-0 py-2 px-3 border ${
              button.value === status ? "border-[#64748B]" : "border-[#E2E8F0]"
            } ${
              button.count === 0 ? "cursor-not-allowed" : ""
            } text-xs rounded-md font-semibold sm:min-w-[358px]`}
            disabled={button.count === 0}
          >
            {button.name}
            <span className="text-[10px] text-[#64748B] font-medium ml-2">
              {button.count}
            </span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between my-4">
        <FilterPopover
          isTableFiltered={isTableFiltered}
          setIsTableFiltered={setIsTableFiltered}
          waitlist={waitlist}
          setWaitList={setWaitList}
          setStatus={setStatus}
          fetchWaitList={fetchWaitList}
          setDateRange={setDateRange}
          setPage={setPage}
        />
        <div className="flex gap-4">
          <button
            className="cp"
            onClick={() => {
              setPage(0);
              setIsTableFiltered(false);
              setStatus("all");
            }}
          >
            <BsArrowRepeat />
          </button>
          <ManageColumnPopover setVisibleHeaders={setVisibleHeaders} />
        </div>
      </div>
      {waitlist.data.length > 0 ? (
        <div className="mt-2">
          <Table
            data={waitlist}
            headers={tableHeaders}
            setPage={setPage}
            setLimit={setLimit}
          />
        </div>
      ) : (
        <p className="text-center font-semibold">No Records found</p>
      )}
    </div>
  );
}
