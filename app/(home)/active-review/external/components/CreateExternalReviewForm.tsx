'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AppUser } from '@/types/supabase.types';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { createNewExternalReview, CreateExternalReviewInput } from '../actions';
import { toast } from 'sonner';

interface CreateExternalReviewFormProps {
  reviewees: Pick<AppUser, 'id' | 'full_name'>[];
}

export function CreateExternalReviewForm({ reviewees }: CreateExternalReviewFormProps) {
  const [open, setOpen] = useState(false);
  const [selectedReviewee, setSelectedReviewee] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedReviewee) {
      toast.error('Por favor seleccione un evaluado');
      return;
    }

    setIsSubmitting(true);

    try {
      const input: CreateExternalReviewInput = {
        revieweeId: selectedReviewee,
      };

      const result = await createNewExternalReview(input);

      if (result.success) {
        toast.success('Evaluación externa creada exitosamente');
        setOpen(false);
        setSelectedReviewee('');
      } else {
        toast.error(result.error || 'Error al crear la evaluación externa');
      }
    } catch (error) {
      console.error('Error creating external review:', error);
      toast.error('Ocurrió un error al crear la evaluación externa');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Evaluación Externa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Evaluación Externa</DialogTitle>
          <DialogDescription>
            Seleccione un evaluado para crear una nueva evaluación externa
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Select
            value={selectedReviewee}
            onValueChange={setSelectedReviewee}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar evaluado" />
            </SelectTrigger>
            <SelectContent>
              {reviewees.map((reviewee) => (
                <SelectItem key={reviewee.id} value={reviewee.id}>
                  {reviewee.full_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedReviewee || isSubmitting}
          >
            {isSubmitting ? 'Creando...' : 'Crear'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}