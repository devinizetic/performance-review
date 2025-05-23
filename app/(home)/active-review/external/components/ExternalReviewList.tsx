'use client';

import { ExternalReviewListItem } from '@/lib/repository/external-reviews-repository';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClipboardCopy, Check, Clock, Eye, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { format } from 'date-fns';
import { updateExternalReviewStatus } from '../actions';
import { ReviewDetailsDialog } from './ReviewDetailsDialog';

interface ExternalReviewListProps {
  reviews: ExternalReviewListItem[];
}

export function ExternalReviewList({ reviews }: ExternalReviewListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

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

  const handleViewReview = (reviewId: string) => {
    setSelectedReview(reviewId);
    setIsDialogOpen(true);
  };

  const handleApproveReview = async (reviewId: string) => {
    setIsUpdating(reviewId);
    try {
      const result = await updateExternalReviewStatus(reviewId, 'approved');
      if (result.success) {
        toast.success('Evaluación aprobada correctamente');
      } else {
        toast.error(result.error || 'Error al aprobar la evaluación');
      }
    } catch (error) {
      console.error('Error approving review:', error);
      toast.error('Ocurrió un error al aprobar la evaluación');
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDeclineReview = async (reviewId: string) => {
    setIsUpdating(reviewId);
    try {
      const result = await updateExternalReviewStatus(reviewId, 'declined');
      if (result.success) {
        toast.success('Evaluación rechazada correctamente');
      } else {
        toast.error(result.error || 'Error al rechazar la evaluación');
      }
    } catch (error) {
      console.error('Error declining review:', error);
      toast.error('Ocurrió un error al rechazar la evaluación');
    } finally {
      setIsUpdating(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-blue-600"><Check className="mr-1 h-3 w-3" /> Completado</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-600"><ThumbsUp className="mr-1 h-3 w-3" /> Aprobado</Badge>;
      case 'declined':
        return <Badge variant="default" className="bg-red-600"><ThumbsDown className="mr-1 h-3 w-3" /> Rechazado</Badge>;
      default:
        return <Badge variant="outline"><Clock className="mr-1 h-3 w-3" /> Pendiente</Badge>;
    }
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
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Evaluado</TableHead>
            <TableHead>Evaluador</TableHead>
            <TableHead>Fecha Creación</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha Completado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="font-medium">
                {review.reviewee?.full_name || 'Usuario Desconocido'}
              </TableCell>
              <TableCell>
                {review.reviewer_name || 'Sin nombre'}
              </TableCell>
              <TableCell>
                {review.created_at ? format(new Date(review.created_at), 'dd/MM/yyyy') : '-'}
              </TableCell>
              <TableCell>
                {getStatusBadge(review.status)}
              </TableCell>
              <TableCell>
                {review.completed_at ? format(new Date(review.completed_at), 'dd/MM/yyyy') : '-'}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyToClipboard(review.token as string, review.id)}
                >
                  {copiedId === review.id ? (
                    <><Check className="mr-1 h-4 w-4" /> Copiado</>
                  ) : (
                    <><ClipboardCopy className="mr-1 h-4 w-4" /> Copiar</>
                  )}
                </Button>
                
                {review.status === 'completed' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewReview(review.id)}
                      disabled={isUpdating === review.id}
                    >
                      <Eye className="mr-1 h-4 w-4" /> Ver
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveReview(review.id)}
                      disabled={isUpdating === review.id}
                    >
                      <ThumbsUp className="mr-1 h-4 w-4" /> Aprobar
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleDeclineReview(review.id)}
                      disabled={isUpdating === review.id}
                    >
                      <ThumbsDown className="mr-1 h-4 w-4" /> Rechazar
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {selectedReview && (
        <ReviewDetailsDialog
          reviewId={selectedReview}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </>
  );
}