"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client"

import { useSuspenseQuery } from "@tanstack/react-query";

export const MembersView = () => {
    const trpc = useTRPC();
    const {data } = useSuspenseQuery(trpc.members.getAll.queryOptions());

    return (
        <div>
            {/* <ResponsiveDialog
                title="ResponsiveDialog text"
                description="ResponsiveDialog Description"
                open
                onOpenChange={() => {}}
            >
                <Button>
                    Actions
                </Button>
            </ResponsiveDialog> */}
            {JSON.stringify(data, null, 2)}
        </div>
    )
} 

export const MembersviewLoading = () => {
    return(
        <LoadingState
            title="Loading Members"
            description="This may take a few seconds..."
        />
    );
}

export const MembersviewError = () => {
    return(
        <ErrorState
                title="Failed to Load members"
                description="Please try again later"
        />
    );
}