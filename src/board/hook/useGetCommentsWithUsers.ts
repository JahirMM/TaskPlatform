import { CommentWithUserInterface } from "@/board/interfaces/CommentWithUserInterface";
import { getUserByIdService } from "@/common/services/getGetUserById";
import { useGetComments } from "@/board/hook/useGetComments";
import { useQuery } from "@tanstack/react-query";

export const useGetCommentsWithUsers = (taskId: string) => {
  const { data: comments } = useGetComments(taskId);

  const enrichedQuery = useQuery<CommentWithUserInterface[]>({
    queryKey: ["getCommentsWithUsers", taskId],
    queryFn: async (): Promise<CommentWithUserInterface[]> => {
      if (!comments || comments.length === 0) return [];

      return Promise.all(
        comments.map(async (comment): Promise<CommentWithUserInterface> => {
          const user = await getUserByIdService(comment.user_id);
          return { ...comment, user };
        })
      );
    },
    enabled: !!comments,
  });

  return {
    ...enrichedQuery,
    data: enrichedQuery.data,
    originalComments: comments,
  };
};
