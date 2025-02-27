'use client';

import { SimpleUserReview } from '@/types/supabase.types';
import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CurrentReviewTableProps {
  currentReviews: SimpleUserReview[];
}

type SortDirection = 'asc' | 'desc';
type SortField = 'reviewer' | 'reviewee';
type ReviewStatus = "all" | "pending" | "feedback" | "complete" | "reviewer" | "reviewee";

const statusOptions = [
  { value: "all", label: "Todos los estados" },
  { value: "feedback", label: "Feedback completado" },
  { value: "complete", label: "Completada por ambos" },
  { value: "reviewer", label: "Falta evaluado" },
  { value: "reviewee", label: "Falta evaluador" },
  { value: "pending", label: "Pendiente" },
] as const;

const CurrentReviewTable: React.FC<CurrentReviewTableProps> = ({
  currentReviews
}) => {
  const [filterText, setFilterText] = useState('');
  const [sortField, setSortField] = useState<SortField>('reviewer');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [statusFilter, setStatusFilter] = useState<ReviewStatus>("all");

  const getStatusInfo = (
    reviewerCompleted: string | null, 
    revieweeCompleted: string | null,
    feedbackCompleted: string | null
  ) => {
    if (feedbackCompleted) {
      return {
        label: 'Feedback completado',
        variant: 'secondary' as const,
      };
    }
    if (reviewerCompleted && revieweeCompleted) {
      return {
        label: 'Completada por ambos',
        variant: 'default' as const,
      };
    }
    if (revieweeCompleted) {
      return {
        label: 'Falta evaluador',
        variant: 'outline' as const,
      };
    }
    if (reviewerCompleted) {
      return {
        label: 'Falta evaluado',
        variant: 'outline' as const,
      };
    }
    return {
      label: 'Pendiente',
      variant: 'destructive' as const,
    };
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedReviews = useMemo(() => {
    let result = [...currentReviews];
    
    // Text filter
    if (filterText) {
      const lowerFilter = filterText.toLowerCase();
      result = result.filter(review => 
        (review.reviewer.full_name || '').toLowerCase().includes(lowerFilter) ||
        (review.reviewee.full_name || '').toLowerCase().includes(lowerFilter)
      );
    }
    
    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(review => {
        const revieweeCompleted = review.reviewee_completed_timestamp;
        const reviewerCompleted = review.reviewer_completed_timestamp;
        const feedbackCompleted = review.feedback_completed_timestamp;

        switch (statusFilter) {
          case "feedback":
            return !!feedbackCompleted;
          case "complete":
            return !!revieweeCompleted && !!reviewerCompleted && !feedbackCompleted;
          case "reviewer":
            return !!reviewerCompleted && !revieweeCompleted;
          case "reviewee":
            return !!revieweeCompleted && !reviewerCompleted;
          case "pending":
            return !revieweeCompleted && !reviewerCompleted;
          default:
            return true;
        }
      });
    }
    
    // Sort
    result.sort((a, b) => {
      const aValue = sortField === 'reviewer' ? (a.reviewer.full_name || '') : (a.reviewee.full_name || '');
      const bValue = sortField === 'reviewer' ? (b.reviewer.full_name || '') : (b.reviewee.full_name || '');
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
    
    return result;
  }, [currentReviews, filterText, sortField, sortDirection, statusFilter]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronUp className="h-4 w-4 opacity-0 group-hover:opacity-50" />;
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4" /> 
      : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Filtrar por nombre de evaluador o evaluado..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as ReviewStatus)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              onClick={() => handleSort('reviewer')}
              className="cursor-pointer group hover:text-primary"
            >
              <div className="flex items-center gap-1">
                Evaluador
                <SortIcon field="reviewer" />
              </div>
            </TableHead>
            <TableHead 
              onClick={() => handleSort('reviewee')}
              className="cursor-pointer group hover:text-primary"
            >
              <div className="flex items-center gap-1">
                Evaluado
                <SortIcon field="reviewee" />
              </div>
            </TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedReviews.map((review) => {
            const revieweeCompleted = review.reviewee_completed_timestamp;
            const reviewerCompleted = review.reviewer_completed_timestamp;
            const feedbackCompleted = review.feedback_completed_timestamp;
            const isComplete = revieweeCompleted && reviewerCompleted;
            const status = getStatusInfo(reviewerCompleted, revieweeCompleted, feedbackCompleted);

            return (
              <TableRow 
                key={review.id}
                className="group cursor-pointer hover:bg-muted/50"
                onClick={() => {
                  if (isComplete) {
                    window.location.href = `/feedback/${review.id}?readonly=true`;
                  }
                }}
              >
                <TableCell className="font-medium">
                  {review.reviewer.full_name}
                </TableCell>
                <TableCell>{review.reviewee.full_name}</TableCell>
                <TableCell>
                  <Badge variant={status.variant}>
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {isComplete && (
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver feedback
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CurrentReviewTable;
