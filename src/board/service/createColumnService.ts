import { supabase } from "@/common/utils/supabase";
import { CreateColumnRequestInterface } from "../interfaces/createColumnRequestInterface";

export const createColumnService = async (
  request: CreateColumnRequestInterface
) => {
  const { data, error } = await supabase.from("columns").insert([request]).select();;

  if (error) {
    throw new Error("Error al crear una columna");
  }

  return data;
};
