"use client";

import { z } from "zod";
import { memberCreateSchema } from "../../schemas";
import { ResponsiveDrawer } from "@/components/responsive-sheet";
import { MemberForm } from "./new-member-form";

interface NewMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type NewMemberForm = z.infer<typeof memberCreateSchema>;

export const NewMemberDialog = ({ open, onOpenChange }: NewMemberDialogProps) => {
  return (
    <ResponsiveDrawer
      title="Create New Member"
      description="Fill in the details to create a new member"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MemberForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDrawer>
  );
};