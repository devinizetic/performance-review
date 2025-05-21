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
import { setActiveReviewAction } from '@/app/actions';

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
          onClick={() => {
            // Placeholder for delete functionality
            console.log('Delete review:', review.id);
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" /> Borrar
        </DropdownMenuItem>
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
