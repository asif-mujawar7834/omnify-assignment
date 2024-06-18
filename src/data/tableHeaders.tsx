import { ReactNode } from "react";
import {
  AiOutlineAppstore,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineInfoCircle,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from "react-icons/ai";
interface headersType {
  id: number;
  name: string;
  value: string;
  icon: ReactNode;
}
export const headers: headersType[] = [
  {
    id: 1,
    name: "Created On",
    value: "createdOn",
    icon: <AiOutlineCalendar />,
  },
  {
    id: 2,
    name: "Payer",
    value: "payer",
    icon: <AiOutlineUser />,
  },
  {
    id: 3,
    name: "Status",
    value: "status",
    icon: <AiOutlineInfoCircle />,
  },
  {
    id: 4,
    name: "Email",
    value: "email",
    icon: <AiOutlineMail />,
  },
  {
    id: 5,
    name: "Payer Phone Number",
    value: "payerPhoneNumber",
    icon: <AiOutlinePhone />,
  },
  {
    id: 6,
    name: "Service",
    value: "service",
    icon: <AiOutlineAppstore />,
  },
  {
    id: 7,
    name: "Scheduled",
    value: "scheduled",
    icon: <AiOutlineClockCircle />,
  },
];
