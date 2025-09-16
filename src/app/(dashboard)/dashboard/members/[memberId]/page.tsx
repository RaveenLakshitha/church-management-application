import { MemberIdView, MemberIDviewError, MemberIdviewLoading } from "@/modules/members/ui/views/member-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary} from "react-error-boundary";
import { Suspense } from "react";

interface Props {
  params: Promise<{ memberId: string }>;
}

const Page = async ({ params }: Props) => {
  const { memberId } = await params;

  const memberIdNumber = parseInt(memberId, 10);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.members.getById.queryOptions({ id: memberIdNumber }),
  );

  return (<HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MemberIdviewLoading />}>
            <ErrorBoundary fallback={<MemberIDviewError />}>
                <MemberIdView memberId={memberId}/>
            </ErrorBoundary>
        </Suspense>
  </HydrationBoundary>)
};

export default Page;