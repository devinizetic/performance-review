'use client';

import { useState } from 'react';
import { ReviewerWithReviewees, UserWithRoles } from '@/types/supabase.types';

import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ReviewerCard } from './reviewer-card';
import { AddRevieweeDialog } from './add-reviewee-dialog';

interface RelationshipsListProps {
  reviewers: ReviewerWithReviewees[];
  allUsers: UserWithRoles[];
}

export function RelationshipsList({ reviewers, allUsers }: RelationshipsListProps) {
  // Instead of tracking expanded items in an array, use a single value for each accordion
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [selectedReviewer, setSelectedReviewer] = useState<ReviewerWithReviewees | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddRevieweeClick = (reviewer: ReviewerWithReviewees) => {
    setSelectedReviewer(reviewer);
    setIsAddDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {reviewers.map((reviewer) => (
        <div key={reviewer.id} className="rounded-lg border border-border bg-white">
          <Accordion
            type="single"
            collapsible
            value={activeItem}
            onValueChange={setActiveItem}
          >
            <AccordionItem value={reviewer.id} className="border-none">
              <div className="flex items-center justify-between p-4">
                <AccordionTrigger className="flex-1 py-0 [&>svg]:hidden">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{reviewer.full_name}</span>
                    <span className="text-sm text-muted-foreground">
                      ({reviewer.username})
                    </span>
                    <div className="ml-4 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {reviewer.reviewees?.length || 0} Evaluados
                    </div>
                  </div>
                </AccordionTrigger>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddRevieweeClick(reviewer);
                  }}
                  className="ml-2"
                >
                  <UserPlus className="mr-1 h-4 w-4" />
                  Agregar Evaluado
                </Button>
              </div>
              <AccordionContent className="px-4 pb-4">
                <ReviewerCard 
                  reviewer={reviewer} 
                  refreshData={() => {
                    // Refresh occurs via revalidatePath in server action
                  }}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}

      <AddRevieweeDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        reviewer={selectedReviewer}
        allUsers={allUsers}
        existingRevieweeIds={selectedReviewer?.reviewees.map(r => r.id) || []}
      />
    </div>
  );
}