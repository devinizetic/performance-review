"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EvaluationStatusPieChart } from "./EvaluationStatusPieChart";
import { SimpleUserReview } from "@/types/supabase.types";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface AdminReviewCardProps {
  reviews: SimpleUserReview[];
}

export function AdminReviewCard({ reviews }: AdminReviewCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/reviews/current");
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow group"
      onClick={handleClick}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Periodo Actual</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground gap-1">
            <span>Click para ver detalles</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <EvaluationStatusPieChart reviews={reviews} />
      </CardContent>
    </Card>
  );
}