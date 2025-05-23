'use client';

import { ReviewerWithReviewees } from '@/types/supabase.types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { removeReviewee } from '../actions';
import { toast } from 'sonner';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ReviewerCardProps {
  reviewer: ReviewerWithReviewees;
  refreshData: () => void;
}

export function ReviewerCard({ reviewer, refreshData }: ReviewerCardProps) {
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});

  const handleRemoveReviewee = async (revieweeId: string) => {
    setLoadingState((prev) => ({ ...prev, [revieweeId]: true }));
    
    try {
      await removeReviewee(reviewer.id, revieweeId);
      toast.success('Evaluado removido exitosamente');
    } catch (error) {
      console.error('Failed to remove reviewee:', error);
      toast.error('Error al remover evaluado');
    } finally {
      setLoadingState((prev) => ({ ...prev, [revieweeId]: false }));
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
    <div className="space-y-4">
      {reviewer.reviewees && reviewer.reviewees.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviewer.reviewees.map((reviewee) => (
              <TableRow key={reviewee.id}>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={reviewee.avatar_url || ''} alt={reviewee.full_name || ''} />
                    <AvatarFallback>{getInitials(reviewee.full_name)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{reviewee.full_name}</TableCell>
                <TableCell>{reviewee.username}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveReviewee(reviewee.id)}
                    disabled={loadingState[reviewee.id]}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {loadingState[reviewee.id] ? 'Removiendo...' : 'Remover'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          Este revisor no tiene evaluados asignados.
        </div>
      )}
    </div>
  );
}