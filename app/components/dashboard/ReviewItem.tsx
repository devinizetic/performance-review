'use client';

import { SimpleUserReview } from '@/types/supabase.types';
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from 'react';

interface ReviewItemProps {
  review: SimpleUserReview;
  href: string;
}

export function ReviewItem({ review, href }: ReviewItemProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    // Create date in UTC to avoid timezone offset issues
    const date = new Date(dateString + 'T00:00:00Z');
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC' // Ensure we use UTC to avoid timezone conversion
    });
  };

  const startDate = formatDate(review.review.start_date);
  const endDate = formatDate(review.review.end_date);
  const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : 'Fechas por definir';
  
  // Use feedback route if review is not active
  const linkHref = !review.review.is_active ? `/feedback/${review.id}` : href;
  
  return (
    <Link 
      href={linkHref}
      className="block bg-gray-50/50 hover:bg-gray-50 rounded-md p-4 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <h3 className="font-medium text-primary">{review.review.name}</h3>
          <p className="text-sm text-gray-500">{dateRange}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            !review.review.is_active ? 'bg-zinc-100 text-gray-600' : 'bg-green-50 text-green-700'
          }`}>
            {review.review.is_active ? 'Activa' : 'Finalizada'}
          </span>
          <ChevronRight className="text-gray-400 h-5 w-5" />
        </div>
      </div>
    </Link>
  );
}