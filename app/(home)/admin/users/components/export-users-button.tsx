'use client';

import { Button } from "@/components/ui/button";
import { UserWithRoles } from "@/types/supabase.types";
import { Download } from "lucide-react";

interface ExportUsersButtonProps {
  users: UserWithRoles[];
}

export function ExportUsersButton({ users }: ExportUsersButtonProps) {
  const exportToCSV = () => {
    // Prepare CSV data
    const csvData = users.map(user => ({
      'Nombre Completo': user.full_name || '',
      'Email': user.username || '',
      'Estado': user.is_active ? 'Activo' : 'Inactivo'
    }));

    // Create CSV content
    const headers = Object.keys(csvData[0] || {});
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => 
        headers.map(header => 
          `"${(row as any)[header].toString().replace(/"/g, '""')}"`
        ).join(',')
      )
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `usuarios_sistema_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button 
      onClick={exportToCSV}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      Exportar Usuarios
    </Button>
  );
}
