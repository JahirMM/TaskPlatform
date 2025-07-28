import ProjectMembersList from "@/projectInvitations/components/ProjectMembersList";
import SelectedUsersList from "@/projectInvitations/components/SelectedUsersList";
import UserSearchInput from "@/projectInvitations/components/UserSearchInput";

import { useSendInvitations } from "@/projectInvitations/hooks/useSendInvitationsService";
import { useGetUser } from "@/common/hooks/useGetUser";

import { UserInterface } from "@/common/interfaces/userInterface";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface InvitationFormProps {
  projectId: string;
}

function InvitationForm({ projectId }: InvitationFormProps) {
  const { data: user, isLoading, isError, error } = useGetUser();
  const mutationSendInvitations = useSendInvitations();

  const router = useRouter();

  const [selectedUsers, setSelectedUsers] = useState<UserInterface[]>([]);

  const inviteUsers = useCallback(async () => {
    if (selectedUsers.length === 0 || !user) return;

    try {
      await mutationSendInvitations.mutateAsync({
        users: selectedUsers,
        senderUserId: user.id,
        projectId,
      });
    } catch {
      toast.error("Error al enviar las invitaciones");
    } finally {
      setSelectedUsers([]);
    }
  }, [selectedUsers, user, projectId, mutationSendInvitations]);

  const addSelectedUser = useCallback((user: UserInterface) => {
    setSelectedUsers((prev) => {
      const current = prev ?? [];
      const alreadyExists = current.some((u) => u.id === user.id);
      if (alreadyExists) return current;
      return [...current, user];
    });
  }, []);

  const removeSelectedUser = useCallback((userId: string) => {
    setSelectedUsers((prev) => {
      const current = prev ?? [];
      return current.filter((u) => u.id !== userId);
    });
  }, []);

  if (isError) {
    if (error?.message === "No authenticated user") {
      router.push("/");
      return;
    }

    toast.error("Error al obtener al usuario");
    setTimeout(() => {
      router.push("/projects");
    }, 1500);
  }

  return (
    <section>
      <UserSearchInput onAddUser={addSelectedUser} projectId={projectId} />
      {selectedUsers.length > 0 && (
        <SelectedUsersList
          onInviteUsers={inviteUsers}
          onRemoveUser={removeSelectedUser}
          selectedUsers={selectedUsers}
          isLoading={isLoading}
        />
      )}
      <ProjectMembersList projectId={projectId} />
    </section>
  );
}

export default InvitationForm;
