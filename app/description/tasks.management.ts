import moment from "moment";

import { DATE_FORMAT } from "../utils/constants";

export const columns = [
  {
    title: "Task Name",
    dataIndex: "taskName"
  },
  {
    title: "Description",
    dataIndex: "description"
  },
  {
    title: "Assigned User",
    dataIndex: "assignedUser",
    render: (rec: any) => `${rec?.firstName} ${rec?.lastName}`
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    render: (rec: any) => moment(rec).format(DATE_FORMAT)
  },
  {
    title: "Created By",
    dataIndex: "createdBy"
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    render: (rec: any) => moment(rec).format(DATE_FORMAT)
  },
  {
    title: "Updated By",
    dataIndex: "updatedBy"
  }
];
