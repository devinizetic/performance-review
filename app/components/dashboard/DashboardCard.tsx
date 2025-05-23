'use client';

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface DashboardCardProps {
  title: string;
  href?: string;
  children: React.ReactNode;
}

export function DashboardCard({ title, href, children }: DashboardCardProps) {
  if (href) {
    return (
      <Link 
        href={href}
        className="bg-white rounded-lg shadow-md p-6 h-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <ChevronRight className="text-gray-400" />
        </div>
        <div className="space-y-4">
          {children}
        </div>
      </Link>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}