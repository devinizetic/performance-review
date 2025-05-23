'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Role, UserWithRoles } from "@/types/supabase.types";
import { useState } from "react";
import { updateUserRoles } from "../actions";
import { toast } from "sonner";

interface EditRolesDialogProps {
  user: UserWithRoles;
  allRoles: Role[];
  onSuccess?: () => void;
}

export function EditRolesDialog({ user, allRoles, onSuccess }: EditRolesDialogProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    user.roles.map(role => role.role_id)
  );
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await updateUserRoles(user.id, selectedRoles);
      toast.success('Roles actualizados correctamente');
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      toast.error('Error al actualizar roles');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Editar Roles</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Roles - {user.full_name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-4">
            {allRoles.map((role) => (
              <div key={role.id} className="flex items-center space-x-2">
                <Checkbox
                  id={role.id}
                  checked={selectedRoles.includes(role.id)}
                  onCheckedChange={(checked) => {
                    setSelectedRoles(prev =>
                      checked
                        ? [...prev, role.id]
                        : prev.filter(id => id !== role.id)
                    );
                  }}
                />
                <label
                  htmlFor={role.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {role.role_name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}