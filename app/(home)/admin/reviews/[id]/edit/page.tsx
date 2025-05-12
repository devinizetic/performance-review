'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { updateReview } from '@/app/actions';
import ReviewsRepositoryClient from '@/lib/repository/reviews-repository-client';
import UserReviewRepositoryClient from '@/lib/repository/user-review-repository-client';

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
      className="flex items-center gap-2 p-2 border rounded bg-muted mb-1"
    >
      {/* Drag handle */}
      <span
        {...attributes}
        {...listeners}
        className="cursor-move mr-2"
        tabIndex={0}
        aria-label="Drag"
      >
        ☰
      </span>
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

export default function EditReviewPage() {
  const router = useRouter();
  const params = useParams();
  const reviewId = params?.id as string;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    async function fetchData() {
      const [allQuestions, allUsers] = await Promise.all([
        QuestionsRepositoryClient.getAllQuestions(),
        UserRepositoryClient.getAllUsers()
      ]);
      setQuestions(allQuestions);
      setUsers(allUsers);
      // Fetch review info
      const review = await ReviewsRepositoryClient.getById({ id: reviewId });
      setName(review.name || '');
      setStartDate(review.start_date ? review.start_date.slice(0, 10) : '');
      setEndDate(review.end_date ? review.end_date.slice(0, 10) : '');
      // Fetch review questions and users
      const userReviewData = await UserReviewRepositoryClient.getByReviewId({
        reviewId
      });
      setSelectedUsers(userReviewData.reviewees.map((u: any) => u.reviewee_id));
      console.log(
        'selected questions:',
        userReviewData.questions
          .map((q: any) =>
            allQuestions.find((aq: any) => aq.id === q.question_id)
          )
          .filter(Boolean)
      );
      setSelectedQuestions(
        userReviewData.questions
          .map((q: any) =>
            allQuestions.find((aq: any) => aq.id === q.question_id)
          )
          .filter(Boolean)
      );
    }
    fetchData();
  }, [reviewId]);

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
    console.log('Removing question with id:', id);
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
      const formData = new FormData();
      formData.append('id', reviewId);
      formData.append('name', name);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append(
        'questions',
        JSON.stringify(
          selectedQuestions.map((q, idx) => ({ id: q.id, sequence: idx + 1 }))
        )
      );
      formData.append('users', JSON.stringify(selectedUsers));
      await updateReview(formData);
      router.push('/admin/reviews');
    } catch (err: any) {
      setError(
        err.message || 'Ocurrió un error al actualizar el período de evaluación'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-muted flex flex-col">
      <div className="flex-1 flex flex-col w-full">
        <h1 className="text-4xl font-bold text-primary py-10 px-8">
          Editar Período de Evaluación
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-16 w-full h-full px-8 pb-16"
        >
          {/* Info Section at the top */}
          <section className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6 min-h-[320px] mb-12 w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-2 text-primary">
              Información Básica
            </h2>
            <div className="flex flex-col gap-4">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Label htmlFor="startDate">Fecha de inicio</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              <Label htmlFor="endDate">Fecha de fin</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </section>
          {/* Questions and Users side by side below */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            {/* Questions Section */}
            <section className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6 min-h-[320px]">
              <h2 className="text-2xl font-semibold mb-2 text-primary">
                Preguntas
              </h2>
              <Label className="mb-2">Selecciona y ordena las preguntas</Label>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="mb-2 font-medium">Disponibles</div>
                  <div className="max-h-72 overflow-y-auto border rounded p-2 bg-muted">
                    {questions
                      .filter(
                        (q) => !selectedQuestions.some((sq) => sq.id === q.id)
                      )
                      .map((question) => (
                        <div
                          key={question.id}
                          className="flex items-center gap-2 mb-1"
                        >
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuestionSelect(question)}
                          >
                            Agregar
                          </Button>
                          <span>{question.question_title}</span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-2 font-medium">
                    Seleccionadas (arrastra para ordenar)
                  </div>
                  <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={selectedQuestions.map((q) => q.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="min-h-[40px] max-h-72 overflow-y-auto border rounded p-2 bg-muted">
                        {selectedQuestions.map((question, idx) => (
                          <SortableItem
                            key={question.id}
                            id={question.id}
                            question={question}
                            index={idx}
                            handleRemove={handleQuestionRemove}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
            </section>
            {/* Users Section */}
            <section className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6 min-h-[320px]">
              <h2 className="text-2xl font-semibold mb-2 text-primary">
                Usuarios a Evaluar
              </h2>
              <Label className="mb-2">Selecciona los usuarios</Label>
              <div className="max-h-72 overflow-y-auto border rounded p-2 bg-muted grid grid-cols-1 gap-3 md:grid-cols-1">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center gap-4 py-1">
                    <Checkbox
                      id={`user-${user.id}`}
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) => handleUserToggle(user.id)}
                    />
                    <Label
                      htmlFor={`user-${user.id}`}
                      className="break-words whitespace-normal text-base leading-6"
                    >
                      {user.full_name} ({user.username})
                    </Label>
                  </div>
                ))}
              </div>
            </section>
          </div>
          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}
          <div className="flex gap-2 justify-end mt-6 w-full">
            <Button
              type="submit"
              size="lg"
              className="px-8"
              disabled={isLoading}
            >
              {isLoading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
