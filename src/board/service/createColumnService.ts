import { CreateColumnRequestInterface } from "@/board/interfaces/createColumnRequestInterface";
import { supabase } from "@/common/utils/supabase";

export const createColumnService = async (
  request: CreateColumnRequestInterface
) => {
  const { data, error } = await supabase
    .from("columns")
    .insert([request])
    .select();

  if (error) {
    throw new Error("Error al crear una columna");
  }

  return data;
};
