export interface ITask {
  title: string;
  description?: string;
  created_at: number;
  status: string;
  folder_id?: string;
  task_id: string;
}
