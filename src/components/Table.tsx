import React from "react";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
  FaDotCircle,
} from "react-icons/fa";
import { dataCell, tableDataProps } from "../../types";

export const Table = ({ data, setPage, setLimit, headers }: tableDataProps) => {
  const statusClass = (status: string): { text: string; bg: string } => {
    let text = "";
    let bg = "";
    switch (status) {
      case "lead":
        text = "text-[#3B82F6]";
        bg = "bg-[#EFF6FF]";
        break;
      case "active":
        text = "text-[#15803D]";
        bg = "bg-[#F0FDF9]";
        break;
      case "inactive":
        text = "text-[#334155]";
        bg = "bg-[#F1F5F9]";
        break;
    }
    return {
      text,
      bg,
    };
  };

  const renderPageNumbers = () => {
    const totalPages = data?.totalPages;
    const currentPage = data?.currentPage;
    const pageNumbers = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pageNumbers.push(1, "...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1, "...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...", totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-[#F8FAFC] text-[#64748B] text-xs font-medium">
            <tr className="text-left">
              {headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 border-b border-gray-200 whitespace-nowrap"
                >
                  <div className="flex gap-2 items-center">
                    {header.icon}
                    <span>{header.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((row) => {
              const { bg, text } = statusClass(row.status);
              return (
                <tr
                  key={row.id}
                  className="text-[#374151] font-medium text-xs cursor-pointer hover:bg-slate-100"
                >
                  {headers.map((header) => {
                    const cellValue = row[header.value as keyof dataCell];
                    return (
                      <td
                        key={header.id}
                        className="px-4 py-2 border-b border-[#E2E8F0] whitespace-nowrap"
                      >
                        {header.name === "Payer" ? (
                          (cellValue as string)
                        ) : header.name === "Service" ? (
                          (cellValue as { name: string }).name
                        ) : header.name === "Status" ? (
                          <div
                            className={`${bg} ${text} py-1 px-3 flex gap-2 items-center`}
                          >
                            <FaDotCircle />
                            <span>{cellValue as React.ReactNode}</span>
                          </div>
                        ) : (
                          (cellValue as React.ReactNode)
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full flex flex-col md:flex-row md:justify-between items-center py-3 px-4 mt-2">
        <div className="text-sm flex items-center gap-3 mb-3 md:mb-0">
          <span className="text-[#64748B]">Displaying</span>
          <div className="bg-[#F8FAFC] flex items-center gap-2">
            {data?.data?.length}
            <div className="flex flex-col gap-1">
              <button
                className="text-[8px]"
                disabled={data?.data?.length <= 5}
                onClick={() => {
                  setLimit(data?.limit - 5);
                }}
              >
                <FaAngleUp />
              </button>
              <button
                className="text-[8px]"
                onClick={() => {
                  setLimit(data?.limit + 5);
                }}
                disabled={
                  data?.currentPage === data?.totalPages || data?.limit === 25
                }
              >
                <FaAngleDown />
              </button>
            </div>
          </div>
          <span className="text-[#64748B]">
            Out of{" "}
            <span className="font-medium text-[#18181B]">
              {data?.totalRecords}
            </span>
          </span>
        </div>
        <div className="flex items-center flex-wrap">
          <nav aria-label="Page navigation">
            <ul className="inline-flex items-center text-xs text-[#334155] font-medium">
              <li>
                <button
                  className={`flex items-center gap-2 py-1 px-3 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-slate-100 ${
                    data?.currentPage === 1
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  disabled={data?.currentPage === 1}
                  onClick={() => {
                    setPage(Number(data?.currentPage) - 1);
                  }}
                >
                  <FaAngleLeft className="w-4 h-4" />
                  Previous
                </button>
              </li>
              {renderPageNumbers().map((page, index) => (
                <li key={index}>
                  {page === "..." ? (
                    <span className="py-1 px-3 text-black">...</span>
                  ) : (
                    <button
                      className={`py-1 px-3 text-black transition-colors duration-150 focus:shadow-outline ${
                        data?.currentPage === page
                          ? "border-2 border-[#E2E8F0] rounded-md"
                          : ""
                      }`}
                      onClick={() => setPage(page)}
                    >
                      {page}
                    </button>
                  )}
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setPage(Number(data?.currentPage) + 1);
                  }}
                  disabled={data?.currentPage === data?.totalPages}
                  className={`flex items-center gap-2 py-1 px-3 transition-colors duration-150 rounded-r-lg focus:shadow-outline hover:bg-slate-200 ${
                    data?.currentPage === data?.totalPages
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  Next
                  <FaAngleRight className="w-4 h-4" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
