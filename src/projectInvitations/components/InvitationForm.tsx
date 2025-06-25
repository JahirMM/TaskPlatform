import ProjectMembersList from "@/projectInvitations/components/ProjectMembersList";
import SelectedUsersList from "@/projectInvitations/components/SelectedUsersList";
import UserSearchInput from "@/projectInvitations/components/UserSearchInput";

import { UserInterface } from "@/common/interfaces/userInterface";

import { useCallback, useState } from "react";

interface InvitationFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
}

function InvitationForm({ setShowForm, projectId }: InvitationFormProps) {
  const [selectedUsers, setSelectedUsers] = useState<UserInterface[]>([]);

  const inviteUsers = useCallback(() => {
    if (selectedUsers.length === 0) return;
    console.log(selectedUsers);
    setSelectedUsers([])
    setShowForm(false);
  }, [selectedUsers, setShowForm]);

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

  return (
    <section>
      <UserSearchInput onAddUser={addSelectedUser} projectId={projectId}/>
      {selectedUsers.length > 0 && (
        <SelectedUsersList
          onInviteUsers={inviteUsers}
          onRemoveUser={removeSelectedUser}
          selectedUsers={selectedUsers}
        />
      )}
      <ProjectMembersList />
    </section>
  );
}

export default InvitationForm;
