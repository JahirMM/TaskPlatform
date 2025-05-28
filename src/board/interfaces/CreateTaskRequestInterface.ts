export interface CreateTaskRequestInterface {
  column_id: string;
  user_id: string;
  title: string;
  description?: string;
  position: number;
  priority?: string;
}
