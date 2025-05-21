'use client';

import Link from 'next/link';
import { Pencil, Trash2, CheckCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Review } from '@/types/supabase.types';
import { setActiveReviewAction, setReviewDeletedAction } from '@/app/actions';

interface ReviewActionsDropdownProps {
  review: Review;
}

export function ReviewActionsDropdown({ review }: ReviewActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="inline-flex items-center gap-1 px-3 py-1 rounded bg-primary text-white hover:bg-primary/80 transition text-sm"
        >
          Acciones
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            href={`/admin/reviews/${review.id}/edit`}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Pencil className="w-4 h-4" /> Editar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            if (!review.is_deleted) {
              await setReviewDeletedAction(review.id, true);
            } else {
              await setReviewDeletedAction(review.id, false);
            }
          }}
          className={`flex items-center gap-2 cursor-pointer ${
            review.is_deleted ? 'text-yellow-600' : ''
          }`}
        >
          <Trash2 className="w-4 h-4" />
          {review.is_deleted ? 'Restaurar' : 'Borrar'}
        </DropdownMenuItem>
        {review.is_deleted && (
          <DropdownMenuItem
            disabled
            className="flex items-center gap-2 text-red-500 cursor-not-allowed"
          >
            Eliminado
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={async () => {
            await setActiveReviewAction(review.id);
          }}
          className="flex items-center gap-2 cursor-pointer"
          disabled={review.is_active}
        >
          <CheckCircle className="w-4 h-4" /> Activar Período
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
