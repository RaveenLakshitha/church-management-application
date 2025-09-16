"use client"

import { PlusIcon } from "lucide-react";
import { NewMemberDialog } from "./new-member-dialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export const MembersListHeader = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return(
        <>
        <NewMemberDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
        <div className="py-4 px-4 nd:px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    Members
                </h2>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusIcon />
                    New Member
                </Button>
            </div>
        </div>
        </>
    );
};