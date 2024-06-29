import { dummyData } from "@/data/tableData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("size")) || 10;
    const startDateString = searchParams.get("startdate");
    const endDateString = searchParams.get("enddate");
    const firstName = searchParams.get("firstname");
    const serviceName = searchParams.get("servicename");
    const services = searchParams.get("services");

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let data = dummyData;

    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const normalizeDate = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };
    const newRecords = data.filter((d) => {
      const createdOnDate = normalizeDate(new Date(d.createdOn));
      return createdOnDate >= last24Hours && createdOnDate <= now;
    });

    switch (status) {
      case "all":
        break;

      case "lead":
        data = data.filter((d) => d.status === "lead");
        break;

      case "bydaterange":
        const sDate = normalizeDate(new Date(startDateString as string));
        const eDate = normalizeDate(new Date(endDateString as string));
        data = data.filter((d) => {
          const createdOnDate = normalizeDate(new Date(d.createdOn));
          return createdOnDate >= sDate && createdOnDate <= eDate;
        });
        break;

      case "newlyadded":
        data = newRecords;
        break;

      case "byfirstname":
        data = data.filter((d) =>
          d.payer.toLowerCase().includes(firstName?.toLowerCase() as string)
        );
        break;

      case "services":
        const serviceMap = new Map();

        data.forEach((item) => {
          const serviceNm = item.service.name;
          if (!serviceMap.has(serviceNm)) {
            serviceMap.set(serviceNm, item);
          }
        });

        const allServices = Array.from(serviceMap.values());
        data = allServices.filter((d) =>
          d.service.name
            .toLowerCase()
            .includes(services?.toLowerCase() as string)
        );
        break;

      case "byservicename":
        const sarr = services?.split(",").map((s) => s.toLowerCase()) ?? [];
        data = data.filter((d) =>
          sarr.some((service) => d.service.name.toLowerCase().includes(service))
        );
        break;
      default:
        break;
    }

    const pagiNatedData = data.slice(startIndex, endIndex);
    return Response.json(
      {
        success: true,
        data: pagiNatedData,
        currentPage: page,
        totalPages: Math.ceil(data?.length / limit),
        allWaitList: dummyData?.length,
        totalRecords: data?.length,
        newRecords: newRecords?.length,
        limit,
        leadTotalRecords: dummyData.filter((data) => data.status === "lead")
          ?.length,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        {
          success: false,
          message: error.message,
        },
        { status: 200 }
      );
    }
  }
}
