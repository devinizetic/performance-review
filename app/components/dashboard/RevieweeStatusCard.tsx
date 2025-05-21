'use client';

import { CheckCircle, Hourglass, PartyPopper, UserCheck } from 'lucide-react';
import { SimpleUserReview } from '@/types/supabase.types';

interface RevieweeStatusCardProps {
  review: SimpleUserReview;
}

export function RevieweeStatusCard({ review }: RevieweeStatusCardProps) {
  // Determine status
  const revieweeDone = !!review.reviewee_completed_timestamp;
  const reviewerDone = !!review.reviewer_completed_timestamp;

  let status = 'En progreso';
  let icon = <Hourglass className="w-8 h-8 text-blue-500" />;
  let color = 'text-blue-700';

  if (revieweeDone && reviewerDone) {
    status =
      '¡Ambos finalizaron! Pronto RRHH te contactará para la reunión final.';
    icon = <PartyPopper className="w-8 h-8 text-green-500" />;
    color = 'text-green-700';
  } else if (revieweeDone && !reviewerDone) {
    status = 'Esperando a que tu evaluador finalice su parte.';
    icon = <UserCheck className="w-8 h-8 text-yellow-500" />;
    color = 'text-yellow-700';
  } else if (!revieweeDone && reviewerDone) {
    status = 'Tu evaluador ya finalizó. ¡Completa tu autoevaluación!';
    icon = <CheckCircle className="w-8 h-8 text-yellow-500" />;
    color = 'text-yellow-700';
  } else {
    status = 'Evaluación en progreso.';
    icon = <Hourglass className="w-8 h-8 text-blue-500" />;
    color = 'text-blue-700';
  }

  let showLink = false;
  let linkUrl = '';
  if (!revieweeDone) {
    showLink = true;
    linkUrl = `/my-review/${review.id}`;
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {icon}
      <span className={`font-semibold text-lg ${color}`}>{status}</span>
      {showLink && (
        <a
          href={linkUrl}
          className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary/90 transition-colors"
        >
          Completar Autoevaluación
        </a>
      )}
    </div>
  );
}
