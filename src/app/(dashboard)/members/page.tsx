
import { MembersView, MembersviewError, MembersviewLoading } from "@/modules/members/ui/views/members-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary} from "react-error-boundary";

const Page = async() => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.members.getAll.queryOptions());
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MembersviewLoading/>}>
                <ErrorBoundary fallback={<MembersviewError />}>
                    <MembersView/>
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    );
};

export default Page;