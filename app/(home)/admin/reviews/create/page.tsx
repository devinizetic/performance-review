'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createNewReview } from '@/app/actions';
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

export default function CreateReviewPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    QuestionsRepositoryClient.getAllQuestions().then(setQuestions);
    UserRepositoryClient.getAllUsers().then((users) => {
      setUsers(users);
      console.log(users);
    });
  }, []);

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
      router.push('/admin/reviews');
    } catch (err: any) {
      setError(
        err.message || 'Ocurrió un error al crear el período de evaluación'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-muted flex flex-col">
      <div className="flex-1 flex flex-col w-full">
        <h1 className="text-4xl font-bold text-primary py-10 px-8">
          Crear Nuevo Período de Evaluación
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
                placeholder="Evaluación Q2 2025"
                required
              />
              <Label htmlFor="startDate">Fecha de inicio</Label>
              <Input id="startDate" name="startDate" type="date" required />
              <Label htmlFor="endDate">Fecha de fin</Label>
              <Input id="endDate" name="endDate" type="date" required />
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
              {isLoading ? 'Creando...' : 'Crear Período'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
