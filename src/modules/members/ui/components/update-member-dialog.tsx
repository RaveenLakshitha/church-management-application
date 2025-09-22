"use client";

import { z } from "zod";
import { memberCreateSchema } from "../../schemas";
import { ResponsiveDrawer } from "@/components/responsive-sheet";
import { MemberForm } from "./new-member-form";
import { MemberGetOne } from "../../types";

interface UpdateMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MemberGetOne;
}

export const UpdateMemberDialog = ({ open, onOpenChange, initialValues }: UpdateMemberDialogProps) => {
  return (
    <ResponsiveDrawer
      title="Edit Member"
      description="Edit the Member Details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MemberForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDrawer>
  );
};