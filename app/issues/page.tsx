
import IssueActions from "./IssueActions";
import { Suspense } from 'react';
import IssueTable from "./new/IssueTable";

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

export default IssuesPage