import { CreateTaskRequestInterface } from "@/board/interfaces/CreateTaskRequestInterface";
import { supabase } from "@/common/utils/supabase";

export const createTaskService = async (
  request: CreateTaskRequestInterface
) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert([request])
    .select();

  if (error) {
    throw new Error("Error al crear la tarea");
  }

  return data;
};
