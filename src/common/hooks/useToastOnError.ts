"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function useToastOnError(isError: boolean, error: unknown) {
  useEffect(() => {
    if (isError) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ha ocurrido un error desconocido");
      }
    }
  }, [isError, error]);
}
