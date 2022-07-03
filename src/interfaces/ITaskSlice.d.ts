import { ITask } from "./ITask";

export interface ITaskSlice {
  isLoaded: boolean;
  tasks: ITask[];
}
