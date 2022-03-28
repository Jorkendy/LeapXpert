import { Status } from "../constants";

export type Task = {
  id: string;
  name: string;
  status: Status;
};
