import { commentInterface } from "@/board/interfaces/commentInterface";
import { UserInterface } from "@/common/interfaces/userInterface";

export interface CommentWithUserInterface extends commentInterface {
  user: UserInterface;
}
