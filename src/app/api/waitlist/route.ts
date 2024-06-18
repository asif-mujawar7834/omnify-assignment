import { dummyData } from "@/data/tableData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("size")) || 10;
  const startDateString = searchParams.get("startdate");
  const endDateString = searchParams.get("enddate");
  const firstName = searchParams.get("firstname");
  const serviceName = searchParams.get("servicename");

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let data = dummyData;
  switch (status) {
    case "all":
      break;

    case "lead":
      data = data.filter((d) => d.status === "lead");
      break;

    case "bydaterange":
      const sDate = new Date(startDateString as string);
      const eDate = new Date(endDateString as string);
      data = data.filter((d) => {
        const createdOnDate = new Date(d.createdOn);
        return createdOnDate >= sDate && createdOnDate <= eDate;
      });
      break;

    case "byfirstname":
      data = data.filter((d) =>
        d.payer.toLowerCase().includes(firstName?.toLowerCase() as string)
      );
      break;

    case "byservicename":
      data = data.filter((d) =>
        d.service.name
          .toLowerCase()
          .includes(serviceName?.toLowerCase() as string)
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
      totalPages: Math.ceil(data.length / limit),
      totalRecords: dummyData.length,
      limit,
      leadTotalRecords: dummyData.filter((data) => data.status === "lead")
        .length,
    },
    { status: 200 }
  );
}
