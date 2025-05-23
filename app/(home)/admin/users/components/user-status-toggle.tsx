'use client';

import { Switch } from "@/components/ui/switch";
import { UserWithRoles } from "@/types/supabase.types";
import { updateUserStatus } from "../actions";
import { useState } from "react";
import { toast } from "sonner";

interface UserStatusToggleProps {
  user: UserWithRoles;
  onSuccess?: () => void;
}

export function UserStatusToggle({ user, onSuccess }: UserStatusToggleProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (checked: boolean) => {
    try {
      setIsLoading(true);
      await updateUserStatus(user.id, checked);
      toast.success(`Usuario ${checked ? 'activado' : 'desactivado'} correctamente`);
      onSuccess?.();
    } catch (error) {
      toast.error('Error al actualizar estado del usuario');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Switch
      checked={user.is_active}
      onCheckedChange={handleStatusChange}
      disabled={isLoading}
      className="data-[state=checked]:bg-green-500"
    />
  );
}