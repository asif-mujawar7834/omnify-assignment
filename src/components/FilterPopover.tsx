import { CiFilter } from "react-icons/ci";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { dataCell, waitListAPIResponse } from "../../types";
import { FaCalendar, FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { FaPeopleGroup } from "react-icons/fa6";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { Form } from "./ui/form";
import { z } from "zod";
import {
  peopleFilterSchema,
  scheduleDateFilterSchema,
  serviceFilterSchema,
} from "@/schemas/FilterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScheduleDateFilter } from "./ScheduleDateFilter";
import { PeoplesFilter } from "./PeoplesFilter";
import { ServicesFilter } from "./ServicesFilter";
import { useDebounce } from "@/hooks/useDebounce";

interface FilterPopoverProps {
  isTableFiltered: boolean;
  waitlist: waitListAPIResponse;
  setStatus: Dispatch<SetStateAction<string>>;
  setWaitList: Dispatch<SetStateAction<waitListAPIResponse>>;
  setIsTableFiltered: Dispatch<SetStateAction<boolean>>;
  fetchWaitList: () => Promise<void>;
  setDateRange: Dispatch<
    SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
  setPage: Dispatch<SetStateAction<number>>;
}

const defaultState = {
  success: false,
  data: [],
  currentPage: 1,
  totalPages: 1,
  totalRecords: 0,
  newRecords: 0,
  limit: 10,
  leadTotalRecords: 0,
  allWaitList: 0,
};

const FILTER_TYPES = {
  BY_DATE_RANGE: "bydaterange",
  BY_FIRST_NAME: "byfirstname",
  BY_SERVICE_NAME: "byservicename",
};

type ScheduleDateForm = z.infer<typeof scheduleDateFilterSchema>;
type PeopleForm = z.infer<typeof peopleFilterSchema>;
type ServiceForm = z.infer<typeof serviceFilterSchema>;

// Create a union type of all possible form shapes
type FilterForm = ScheduleDateForm & PeopleForm & ServiceForm;

const getSchemaForContent = (content: string) => {
  switch (content) {
    case FILTER_TYPES.BY_DATE_RANGE:
      return scheduleDateFilterSchema;
    case FILTER_TYPES.BY_FIRST_NAME:
      return peopleFilterSchema;
    case FILTER_TYPES.BY_SERVICE_NAME:
      return serviceFilterSchema;
    default:
      return z.object({});
  }
};

export const FilterPopover = ({
  isTableFiltered,
  waitlist,
  setStatus,
  setWaitList,
  setIsTableFiltered,
  fetchWaitList,
  setDateRange,
  setPage,
}: FilterPopoverProps) => {
  const [content, setContent] = useState("bydaterange");
  const methods = useForm<FilterForm>({
    resolver: zodResolver(getSchemaForContent(content)),
    defaultValues: {
      selectedPeople: [],
      selectedServices: [],
      serviceFilterType: "byname",
    },
  });

  const {
    formState: { errors },
    watch,
    reset,
  } = methods;
  const [filteredWaitList, setFilteredWaitList] =
    useState<waitListAPIResponse>(defaultState);
  const [isOpen, setIsOpen] = useState(false);
  const searchTerm = watch("searchTerm");
  const serviceTerm = watch("serviceSearchTerm");
  const { debouncedValue: debouncedSearchTerm } = useDebounce(searchTerm, 500);
  const { debouncedValue: debouncedServiceTerm } = useDebounce(
    serviceTerm,
    500
  );
  const fetchFilteredData = async (type: string, value: string) => {
    try {
      const res = await fetch(
        `/api/waitlist?status=${content}&page=${0}&size=${10}&${type}=${value}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch filtered Waitlist");
      }
      const data = await res.json();
      setFilteredWaitList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setFilteredWaitList(defaultState);
    if (debouncedSearchTerm) {
      fetchFilteredData("firstname", debouncedSearchTerm);
    } else if (debouncedServiceTerm) {
      fetchFilteredData("servicename", debouncedServiceTerm);
    } else {
      setFilteredWaitList(defaultState);
    }
  }, [debouncedSearchTerm, debouncedServiceTerm]);

  const handleChipClick = (id: number, type: string) => {
    const d = waitlist.data;
    const filtered = d.filter((item) => item.id !== id);

    if (filtered?.length === 0) {
      fetchWaitList();
      setIsTableFiltered(false);
      setStatus("all");
    }
    setWaitList((data) => ({
      ...data,
      data: filtered,
    }));
    setFilteredWaitList((data) => ({
      ...data,
      data: filtered,
    }));
  };

  const renderComponent = () => {
    switch (content) {
      case "bydaterange":
        return <ScheduleDateFilter />;
      case "byfirstname":
        return (
          <PeoplesFilter
            debouncedValue={debouncedSearchTerm as string}
            filteredData={filteredWaitList}
          />
        );
      case "byservicename":
        return (
          <ServicesFilter
            debouncedValue={debouncedServiceTerm as string}
            filteredData={filteredWaitList}
          />
        );
    }
  };

  const handleOpenChange = (newState: boolean) => {
    if (!newState) {
      reset();
    }
    setIsOpen(newState);
  };

  const onSubmit = async (values: FilterForm) => {
    if (content === FILTER_TYPES.BY_DATE_RANGE) {
      if ("startDate" in values && "endDate" in values) {
        setDateRange({
          startDate: values.startDate.toString(),
          endDate: values.endDate.toString(),
        });
        setPage(1);
        setStatus(content);
        setIsTableFiltered(true);
        setIsOpen(false);
        return;
      }
    }

    const w = filteredWaitList.data;
    let filteredPeople: dataCell[] = [];
    let filteredServices: dataCell[] = [];

    if (content === FILTER_TYPES.BY_FIRST_NAME) {
      if ("selectedPeople" in values && Array.isArray(values.selectedPeople)) {
        filteredPeople = w.filter((item) =>
          values.selectedPeople.includes(item.id.toString())
        );
      }
    } else if (content === FILTER_TYPES.BY_SERVICE_NAME) {
      if (
        "selectedServices" in values &&
        Array.isArray(values.selectedServices)
      ) {
        filteredServices = w.filter((item) =>
          values.selectedServices.includes(item.id.toString())
        );
      }
    }

    setWaitList((data) => ({
      ...data,
      data: [...filteredPeople, ...filteredServices],
      currentPage: 1,
      limit: 10,
      totalPages: 1,
      totalRecords: filteredPeople?.length + filteredServices?.length,
    }));

    setIsTableFiltered(true);
    reset();
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <div className="flex flex-col items-start sm:flex-row sm:items-center gap-2">
        <PopoverTrigger asChild>
          <button className="rounded-md shrink-0 bg-[#F1F5F9] text-[#334155] text-xs font-medium p-2 flex items-center gap-2">
            <CiFilter className="text-lg" />
            Add Filter
          </button>
        </PopoverTrigger>
        <div className="flex flex-wrap gap-2">
          {isTableFiltered &&
            waitlist.data.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 text-[#64748B] bg-[#F8FAFC] text-sm py-1 px-2 font-medium"
                onClick={() => handleChipClick(item.id, "people")}
              >
                <span>{item.payer}</span>
                <button className="bg-[#F1F5F9] p-1">
                  <FaTimes />
                </button>
              </div>
            ))}
        </div>
      </div>
      <PopoverContent className="w-[612px] p-0" side="bottom" align="start">
        <div className="relative min-h-[435px] max-h-[500px] grid grid-cols-[230px_1fr] grid-rows-[1fr_auto] h-full">
          <div className="bg-[#F8FAFC] w-[230px] p-2">
            <button
              onClick={() => {
                reset();
                setContent("bydaterange");
                setFilteredWaitList(defaultState);
              }}
              className={`w-full ${
                content === "bydaterange" ? "bg-[#E2E8F0]" : ""
              } flex items-center gap-2 text-sm p-2 font-medium rounded-md`}
            >
              <FaCalendar />
              Scheduled Date
            </button>
            <button
              onClick={() => {
                reset();
                setFilteredWaitList(defaultState);
                setContent("byfirstname");
              }}
              className={`w-full ${
                content === "byfirstname" ? "bg-[#E2E8F0]" : ""
              } flex items-center gap-2 text-sm p-2 font-medium rounded-md`}
            >
              <FaPeopleGroup />
              People
            </button>
            <button
              onClick={() => {
                reset();
                setFilteredWaitList(defaultState);
                setContent("byservicename");
              }}
              className={`w-full ${
                content === "byservicename" ? "bg-[#E2E8F0]" : ""
              } flex items-center gap-2 text-sm p-2 font-medium rounded-md`}
            >
              <AiOutlineAppstore />
              Services / Products
            </button>
          </div>
          <div>
            <Form {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="p-2">{renderComponent()}</div>
                <div className="col-span-2 border border-top-[#E2E8F0] py-2 px-4 absolute left-0 right-0 bottom-0 bg-[#FFFFFF]">
                  <div className="h-full flex items-center justify-end">
                    <div className="flex gap-2 w-full justify-end">
                      <button
                        className="rounded-md text-sm font-medium text-[#09090B] py-2 px-3 border border-[#E2E8F0] bg-[#F4F4F5]"
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          reset();
                          setDateRange({
                            startDate: "",
                            endDate: "",
                          });
                          setPage(0);
                          setStatus("all");
                          setIsTableFiltered(false);
                        }}
                      >
                        Reset To Default
                      </button>
                      <button
                        className={`rounded-md text-sm bg-[#0F172A] text-[#FFFFFF] py-1 px-3 border border-[#E2E8F0] ${
                          Object.keys(errors)?.length > 0
                            ? "bg-slate-400 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
