import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReviewHistoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Evaluaciones</CardTitle>
        <CardDescription>
          Registro histórico de evaluaciones anteriores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-4">
          Función en desarrollo
        </div>
      </CardContent>
    </Card>
  );
}