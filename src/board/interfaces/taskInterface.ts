export interface TaskInterface {
  id:string;
  column_id: string;
  user_id: string;
  title: string;
  description: string | null;
  position:number;
  priority: string | null;
  created_at: string;
}
