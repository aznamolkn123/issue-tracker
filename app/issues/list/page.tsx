
import { Suspense } from 'react';
import IssueActions from "./IssueActions";
import IssueTable from "../new/IssueTable";

const IssuesPage = async () => {
    return (
        <div >
            <IssueActions />
            <Suspense fallback={<p>Loading Issues...</p>}>
                <IssueTable />
            </Suspense>
        </div>
    )
}

export const dynamic = 'force-dynamic';
export default IssuesPage