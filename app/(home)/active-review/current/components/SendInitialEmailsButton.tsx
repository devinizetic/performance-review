'use client';
import { useTransition, useState } from 'react';
import { Button } from '@/components/ui/button';
import { sendUserReviewsInitialEmail } from '@/app/actions';
import { toast } from 'sonner';

export default function SendInitialEmailsButton({
  reviewId,
  size = 'sm',
  className = ''
}: {
  reviewId: string;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSend = () => {
    setConfirmOpen(false);
    startTransition(async () => {
      const result = await sendUserReviewsInitialEmail(reviewId);
      toast.success(`Se enviaron ${result.sentCount} emails iniciales.`);
    });
  };

  return (
    <>
      <Button
        size={size}
        variant="outline"
        className={`ml-0 mr-2 ${className}`}
        disabled={pending}
        onClick={() => setConfirmOpen(true)}
      >
        Enviar emails iniciales
      </Button>
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="mb-4 text-lg font-semibold">
              ¿Enviar emails iniciales?
            </div>
            <div className="mb-6 text-sm text-gray-600">
              Esto enviará el email inicial a todos los usuarios que aún no lo
              recibieron.
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setConfirmOpen(false)}
                disabled={pending}
              >
                Cancelar
              </Button>
              <Button onClick={handleSend} disabled={pending}>
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
