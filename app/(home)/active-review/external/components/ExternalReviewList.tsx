'use client';

import { ExternalReviewListItem } from '@/lib/repository/external-reviews-repository';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClipboardCopy, Check, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { format } from 'date-fns';

interface ExternalReviewListProps {
  reviews: ExternalReviewListItem[];
}

export function ExternalReviewList({ reviews }: ExternalReviewListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (token: string, reviewId: string) => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/external-review/${token}`;
    
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(reviewId);
      toast.success('Enlace copiado al portapapeles');
      
      // Reset copied state after 3 seconds
      setTimeout(() => {
        setCopiedId(null);
      }, 3000);
    }).catch(err => {
      toast.error('Error al copiar el enlace');
      console.error('Error copying link to clipboard:', err);
    });
  };

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground py-4">
            No hay evaluaciones externas registradas
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Evaluado</TableHead>
          <TableHead>Fecha Creación</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Fecha Completado</TableHead>
          <TableHead className="text-right">Enlace</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.map((review) => (
          <TableRow key={review.id}>
            <TableCell className="font-medium">
              {review.reviewee?.full_name || 'Usuario Desconocido'}
            </TableCell>
            <TableCell>
              {review.created_at ? format(new Date(review.created_at), 'dd/MM/yyyy') : '-'}
            </TableCell>
            <TableCell>
              <Badge 
                variant={review.status === 'completed' ? 'default' : 'outline'} 
                className={review.status === 'completed' ? 'bg-green-600' : ''}
              >
                {review.status === 'completed' ? (
                  <><Check className="mr-1 h-3 w-3" /> Completado</>
                ) : (
                  <><Clock className="mr-1 h-3 w-3" /> Pendiente</>
                )}
              </Badge>
            </TableCell>
            <TableCell>
              {review.completed_at ? format(new Date(review.completed_at), 'dd/MM/yyyy') : '-'}
            </TableCell>
            <TableCell className="text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => copyToClipboard(review.token as string, review.id)}
              >
                {copiedId === review.id ? (
                  <><Check className="mr-1 h-4 w-4" /> Copiado</>
                ) : (
                  <><ClipboardCopy className="mr-1 h-4 w-4" /> Copiar enlace</>
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}