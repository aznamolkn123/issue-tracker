
import { Suspense } from 'react';
import IssueActions from "./IssueActions";
import IssueTable from "../new/IssueTable";
import { Status } from '@/app/generated/prisma/edge';
import { Issue } from '@prisma/client';

interface Props {
    searchParams: Promise<{ status: Status, orderBy: keyof Issue }>
}
const IssuesPage = async ({ searchParams }: Props) => {


    return (
        <div >
            <IssueActions />
            <Suspense fallback={<p>Loading Issues...</p>}>
                <IssueTable searchParams={searchParams} />
            </Suspense>
        </div>
    )
}

export const dynamic = 'force-dynamic';
export default IssuesPage