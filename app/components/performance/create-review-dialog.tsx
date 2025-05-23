'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createNewReview } from '@/app/actions';
import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import UserRepositoryClient from '@/lib/repository/user-repository-client';
import QuestionsRepositoryClient from '@/lib/repository/questions-repository-client';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

function SortableItem({ id, question, index, handleRemove }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-2 p-2 border rounded bg-muted mb-1 cursor-move"
    >
      <span className="font-medium flex-1">{question.question_title}</span>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => handleRemove(id)}
      >
        Quitar
      </Button>
    </div>
  );
}

export function CreateReviewDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    QuestionsRepositoryClient.getAllQuestions?.().then(setQuestions);
    UserRepositoryClient.getAllUsers().then(setUsers);
  }, []);

  // Drag and drop handlers
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSelectedQuestions((items) => {
        const oldIndex = items.findIndex((q) => q.id === active.id);
        const newIndex = items.findIndex((q) => q.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleQuestionSelect = (question: any) => {
    if (!selectedQuestions.some((q) => q.id === question.id)) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };
  const handleQuestionRemove = (id: string) => {
    setSelectedQuestions(selectedQuestions.filter((q) => q.id !== id));
  };

  const handleUserToggle = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(e.currentTarget);
      formData.append(
        'questions',
        JSON.stringify(
          selectedQuestions.map((q, idx) => ({ id: q.id, sequence: idx + 1 }))
        )
      );
      formData.append('users', JSON.stringify(selectedUsers));
      await createNewReview(formData);
      setIsOpen(false);
    } catch (err: any) {
      setError(
        err.message || 'Ocurrió un error al crear el período de evaluación'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link href="/admin/reviews/create">
      <Button variant="default" className="gap-2">
        <PlusCircle className="h-4 w-4" />
        Nuevo Período
      </Button>
    </Link>
  );
}
