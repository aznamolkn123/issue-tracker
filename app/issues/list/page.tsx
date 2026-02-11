import Pagination from "@/app/components/Pagination";
import { Status } from "@/app/generated/prisma/edge";
import { prisma } from "@/app/lib/prisma";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
    searchParams: Promise<IssueQuery>;
}
const IssuesPage = async ({ searchParams }: Props) => {
    const param = await searchParams;

    const statuses = Object.values(Status);
    const status = statuses.includes(param.status) ? param.status : undefined;
    const where = { status };
    const orderBy = columnNames.includes(param.orderBy)
        ? { [param.orderBy]: "asc" }
        : undefined;

    const page = parseInt(param.page) || 1;
    const pageSize = 10;

    const issues = await prisma.issue.findMany({
        where: where,
        orderBy: orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });
    const totalIssues = await prisma.issue.count({ where: where });

    return (
        <Flex direction="column" gap="4">
            <IssueActions />
            <IssueTable searchParams={searchParams} issues={issues} />
            <Pagination
                itemCount={totalIssues}
                pageSize={pageSize}
                currentPage={page}
            />
        </Flex >
    );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
