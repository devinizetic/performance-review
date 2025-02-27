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
  const isComplete = review.reviewee_completed_timestamp && review.reviewer_completed_timestamp;
  
  return (
    <Link 
      href={href}
      className="block bg-gray-50/50 hover:bg-gray-50 rounded-md p-4 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <h3 className="font-medium text-primary">Evaluación Q4 2023</h3>
          <p className="text-sm text-gray-500">1 Enero 2024 - 31 Marzo 2024</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            isComplete ? 'bg-zinc-100 text-gray-600' : 'bg-green-50 text-green-700'
          }`}>
            {isComplete ? 'Finalizada' : 'Activa'}
          </span>
          <ChevronRight className="text-gray-400 h-5 w-5" />
        </div>
      </div>
    </Link>
  );
}