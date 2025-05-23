import { FeedbackScore } from '@/types/supabase.types';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface FeedbackResultTableProps {
  feedbackScores: FeedbackScore[];
}

const FeedbackResultTable: React.FC<FeedbackResultTableProps> = ({
  feedbackScores
}) => {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Evaluador</TableHead>
            <TableHead>Evaluado</TableHead>
            <TableHead>Puntaje</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbackScores.map((feedback) => {
            // Calculate score percentage
            const scorePercentage = ((feedback.score ?? 0) / 25) * 100;
            let scoreVariant: "default" | "destructive" | "secondary" | "outline" = "default";
            
            if (scorePercentage >= 80) scoreVariant = "secondary";
            else if (scorePercentage >= 60) scoreVariant = "default";
            else if (scorePercentage >= 40) scoreVariant = "outline";
            else scoreVariant = "destructive";

            return (
              <TableRow key={feedback.id}>
                <TableCell className="font-medium">
                  {feedback.reviewer_name}
                </TableCell>
                <TableCell>{feedback.reviewee_name}</TableCell>
                <TableCell>{feedback.score}/25 ({Math.round(scorePercentage)}%)</TableCell>
                <TableCell>
                  <Badge variant={scoreVariant}>
                    {scorePercentage >= 80 ? "Excelente" :
                     scorePercentage >= 60 ? "Bueno" :
                     scorePercentage >= 40 ? "Regular" :
                     "Necesita mejorar"}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default FeedbackResultTable;
