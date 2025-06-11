import { CreateCommentRequestInterface } from "@/board/interfaces/createCommentRequestInterface";
import { supabase } from "@/common/utils/supabase";

export const createCommentService = async (
  request: CreateCommentRequestInterface
) => {
  const { error } = await supabase
    .from("comments")
    .insert([request])

  if (error) {
    throw new Error("Error al crear una columna");
  }
};
