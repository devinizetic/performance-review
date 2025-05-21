import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ReviewsRepository from '@/lib/repository/reviews-repository';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { CreateReviewDialog } from '@/app/components/performance/create-review-dialog';
import { ReviewActionsDropdown } from '@/app/components/performance/review-actions-dropdown';

export default async function ReviewsPage() {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const reviews = await ReviewsRepository.getAll();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Períodos de Evaluación</CardTitle>
            <CardDescription>
              Administra los períodos de evaluación de desempeño
            </CardDescription>
          </div>
          <CreateReviewDialog />
        </div>
      </CardHeader>
      <CardContent>
        {reviews && reviews.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha de Inicio</TableHead>
                <TableHead>Fecha de Fin</TableHead>
                <TableHead>Creado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow
                  key={review.id}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="font-medium">
                    {review.name ||
                      `Período ${format(
                        new Date(review.created_at),
                        'yyyy-MM'
                      )}`}
                  </TableCell>
                  <TableCell>
                    {review.is_active ? (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        Activo
                      </Badge>
                    ) : (
                      <Badge variant="outline">Inactivo</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {review.start_date ? (
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        {format(new Date(review.start_date), 'dd/MM/yyyy')}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No iniciado</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {review.end_date ? (
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        {format(new Date(review.end_date), 'dd/MM/yyyy')}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">
                        Sin finalizar
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(review.created_at), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    <ReviewActionsDropdown review={review} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="text-muted-foreground mb-2">
              No hay periodos de evaluación registrados
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
