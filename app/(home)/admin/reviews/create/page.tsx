'use client';
import { useState, useEffect, useRef } from 'react';
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
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col gap-1 mb-4 p-2 border-b border-blue-200 bg-blue-50"
    >
      <div className="flex items-start gap-3">
        <span
          {...attributes}
          {...listeners}
          className="cursor-move mt-1 text-gray-400 select-none"
          tabIndex={0}
          aria-label="Drag"
        >
          ☰
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-primary">
            {question.question_title}
          </div>
          {question.question_description && (
            <div className="text-base text-gray-800 mt-1 break-words">
              {question.question_description}
            </div>
          )}
          {question.question_text_reviewer && (
            <div className="text-xs text-gray-500 mt-1 italic">
              {question.question_text_reviewer}
            </div>
          )}
        </div>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove(id);
          }}
          className="self-center"
        >
          Quitar
        </Button>
      </div>
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
  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    QuestionsRepositoryClient.getAllQuestions().then(setQuestions);
    UserRepositoryClient.getAllUsers().then((users) => {
      setUsers(users);
      console.log(users);
    });
  }, []);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate =
        selectedUsers.length > 0 && selectedUsers.length < users.length;
    }
  }, [selectedUsers, users]);

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
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col w-full py-10 px-4 md:px-8">
        <h1 className="text-4xl font-bold text-primary mb-10">
          Crear Nuevo Período de Evaluación
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-16 w-full h-full"
        >
          {/* Info Section */}
          <section className="border-l-4 border-primary bg-white/80 px-8 py-8 mb-12 w-full">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Información Básica
            </h2>
            <div className="flex flex-col gap-4 max-w-xl">
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

          {/* Questions Section */}
          <section className="border-l-4 border-blue-400 bg-blue-50/60 px-8 py-8 mb-12 w-full">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
              Preguntas
            </h2>
            <Label className="mb-2">Selecciona y ordena las preguntas</Label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="mb-2 font-medium">Disponibles</div>
                <div className="max-h-72 overflow-y-auto border rounded p-2 bg-blue-100">
                  {questions
                    .filter(
                      (q) => !selectedQuestions.some((sq) => sq.id === q.id)
                    )
                    .map((question) => (
                      <div
                        key={question.id}
                        className="flex flex-col gap-1 mb-4 p-2 border-b border-blue-200 bg-blue-50"
                      >
                        <div className="font-semibold text-sm text-primary">
                          {question.question_title}
                        </div>
                        {question.question_description && (
                          <div className="text-base text-gray-800 mt-1 break-words">
                            {question.question_description}
                          </div>
                        )}
                        {question.question_text_reviewer && (
                          <div className="text-xs text-gray-500 mt-1 italic">
                            {question.question_text_reviewer}
                          </div>
                        )}
                        <div className="flex justify-end mt-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuestionSelect(question)}
                          >
                            Agregar
                          </Button>
                        </div>
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
                    <div className="min-h-[40px] max-h-72 overflow-y-auto border rounded p-2 bg-blue-100">
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
          <section className="border-l-4 border-green-400 bg-green-50/60 px-8 py-8 mb-12 w-full">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">
              Usuarios a Evaluar
            </h2>
            <Label className="mb-2">Selecciona los usuarios</Label>
            <div className="flex items-center gap-4 mb-4">
              <input
                ref={selectAllRef}
                id="select-all-users"
                type="checkbox"
                checked={
                  selectedUsers.length === users.length && users.length > 0
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedUsers(users.map((u) => u.id));
                  } else {
                    setSelectedUsers([]);
                  }
                }}
                className="accent-primary w-4 h-4"
              />
              <Label
                htmlFor="select-all-users"
                className="font-semibold text-base cursor-pointer"
              >
                Seleccionar todos
              </Label>
            </div>
            <div className="max-h-72 overflow-y-auto border rounded p-2 bg-green-100 grid grid-cols-1 gap-3 md:grid-cols-1">
              {users.map((user) => (
                <div key={user.id} className="flex items-center gap-4 py-1">
                  <Checkbox
                    id={`user-${user.id}`}
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => handleUserToggle(user.id)}
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
