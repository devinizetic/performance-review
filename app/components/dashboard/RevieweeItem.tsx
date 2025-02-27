'use client';

import { ReviewerRevieweeView } from '@/types/supabase.types';
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from 'react';
import AvatarImage from '../avatar-image';

interface RevieweeItemProps {
  reviewee: ReviewerRevieweeView;
}

export function RevieweeItem({ reviewee }: RevieweeItemProps) {
  const isComplete = reviewee.reviewee_completed && reviewee.reviewer_completed;
  const isPending = !reviewee.reviewer_completed;
  const isWaiting = reviewee.reviewer_completed && !reviewee.reviewee_completed;
  
  const getStatusInfo = () => {
    if (isComplete) {
      return {
        label: 'Feedback listo',
        classes: 'bg-green-50 text-green-700',
        href: `/feedback/${reviewee.user_review_id}`,
        clickable: true
      };
    }
    if (isWaiting) {
      return {
        label: 'Esperando evaluado',
        classes: 'bg-amber-50 text-amber-700',
        clickable: false
      };
    }
    return {
      label: 'Pendiente',
      classes: 'bg-blue-50 text-blue-700',
      href: `/my-review/${reviewee.user_review_id}`,
      clickable: true
    };
  };

  const status = getStatusInfo();
  
  if (!status.clickable) {
    return (
      <div className="block bg-white rounded-md p-4 cursor-default">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AvatarImage
              src={reviewee.avatar_url || ''}
              userInitials={`${reviewee.full_name?.split(' ')[0][0]}${
                reviewee.full_name?.split(' ')[1][0]
              }`}
            />
            <span className="font-medium">{reviewee.full_name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.classes}`}>
              {status.label}
            </span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <Link 
      href={status.href!}
      className="block bg-white rounded-md p-4 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AvatarImage
            src={reviewee.avatar_url || ''}
            userInitials={`${reviewee.full_name?.split(' ')[0][0]}${
              reviewee.full_name?.split(' ')[1][0]
            }`}
          />
          <span className="font-medium">{reviewee.full_name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.classes}`}>
            {status.label}
          </span>
          <ChevronRight className="text-gray-400 h-5 w-5" />
        </div>
      </div>
    </Link>
  );
}