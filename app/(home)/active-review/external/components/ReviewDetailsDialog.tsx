'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getExternalReviewDetails } from '../actions';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface ReviewDetailsDialogProps {
  reviewId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewDetailsDialog({ 
  reviewId, 
  open, 
  onOpenChange 
}: ReviewDetailsDialogProps) {
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && reviewId) {
      setLoading(true);
      setError(null);
      
      // Fetch the review details when dialog opens
      getExternalReviewDetails(reviewId)
        .then((response) => {
          if (response.success) {
            setReview(response.review);
          } else {
            setError(response.error || 'Error al cargar los detalles de la evaluación');
          }
        })
        .catch((err) => {
          console.error('Error fetching review details:', err);
          setError('Error inesperado al cargar los detalles');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, reviewId]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles de la Evaluación Externa</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-4">{error}</div>
        ) : review ? (
          <div className="space-y-6">
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Evaluado:</span>
                <span className="font-medium">{review.reviewee?.full_name || 'Usuario Desconocido'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Evaluador Externo:</span>
                <span className="font-medium">{review.reviewer_name || 'Sin nombre'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estado:</span>
                <Badge
                  variant="outline"
                  className={
                    review.status === 'completed' ? 'bg-blue-600 hover:bg-blue-600' : 
                    review.status === 'approved' ? 'bg-green-600 hover:bg-green-600' : 
                    review.status === 'declined' ? 'bg-red-600 hover:bg-red-600' : ''
                  }
                >
                  {review.status === 'completed' 
                    ? 'Completado' 
                    : review.status === 'approved'
                    ? 'Aprobado'
                    : review.status === 'declined'
                    ? 'Rechazado'
                    : 'Pendiente'
                  }
                </Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Respuestas</h3>
              {review.questions.map((question: any, index: number) => (
                <Card key={question.id} className="mb-4">
                  <CardContent className="pt-6">
                    <p className="font-medium mb-2">{index + 1}. {question.text}</p>
                    
                    {question.answers && question.answers.length > 0 ? (
                      <div className="bg-muted p-3 rounded-md">
                        <p>{question.answers[0].answer}</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic">Sin respuesta</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-4">
            No se encontró la información de la evaluación
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}