'use client';

import { logout } from "@/app/actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function LogoutButton() {
  return (
    <DropdownMenuItem 
      className="cursor-pointer"
      onClick={() => logout()}
    >
      Log out
    </DropdownMenuItem>
  );
}