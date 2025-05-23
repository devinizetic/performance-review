'use client';

import { ReviewerWithReviewees, UserWithRoles } from '@/types/supabase.types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { addReviewee } from '../actions';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check } from 'lucide-react';

interface AddRevieweeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewer: ReviewerWithReviewees | null;
  allUsers: UserWithRoles[];
  existingRevieweeIds: string[];
}

export function AddRevieweeDialog({
  open,
  onOpenChange,
  reviewer,
  allUsers,
  existingRevieweeIds,
}: AddRevieweeDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Only show active users who are not already reviewees of this reviewer
  const eligibleUsers = allUsers.filter(
    (user) => 
      user.is_active && 
      !existingRevieweeIds.includes(user.id) &&
      user.id !== reviewer?.id // Don't allow reviewer to be their own reviewee
  );

  const handleAddReviewee = async (revieweeId: string) => {
    if (!reviewer) return;
    
    setIsLoading(true);
    
    try {
      await addReviewee(reviewer.id, revieweeId);
      toast.success('Evaluado asignado exitosamente');
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to add reviewee:', error);
      toast.error('Error al asignar evaluado');
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string | null): string => {
    if (!name) return '??';
    
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Agregar Evaluado</DialogTitle>
        </DialogHeader>
        
        {reviewer && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground">Asignar evaluado a:</span>
            <span className="font-medium">{reviewer.full_name}</span>
            <span className="text-sm text-muted-foreground">({reviewer.username})</span>
          </div>
        )}
        
        <Command className="border rounded-md">
          <CommandInput placeholder="Buscar usuario..." />
          <CommandList>
            <CommandEmpty>No se encontraron usuarios.</CommandEmpty>
            <CommandGroup heading="Usuarios Disponibles">
              {eligibleUsers.map((user) => (
                <CommandItem
                  key={user.id}
                  value={`${user.full_name} ${user.username}`}
                  onSelect={() => handleAddReviewee(user.id)}
                  disabled={isLoading}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={user.full_name || ''} />
                      <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{user.full_name}</div>
                      <div className="text-sm text-muted-foreground">{user.username}</div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto"
                    disabled={isLoading}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}