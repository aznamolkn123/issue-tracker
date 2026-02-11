
import Link from "@/app/components/Link";
import { Status } from '@/app/generated/prisma/edge';
import { prisma } from '@/app/lib/prisma';
import { Issue } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table, } from "@radix-ui/themes";
import NextLink from "next/link";
import { Suspense } from 'react';
import IssueStatusBadge from "../../components/IssueStatusBadge";
import IssueActions from "./IssueActions";
interface Props {
    searchParams: Promise<{ status: Status, orderBy: keyof Issue }>
}
const IssuesPage = async ({ searchParams }: Props) => {
    const param = await searchParams;
    const columns: {
        label: string;
        value: keyof Issue;
        classname?: string
    }[] = [
            { label: "Issue", value: "title" },
            { label: "Status", value: "status", classname: "hidden md:table-cell" },
            { label: "Created At", value: "createdAt", classname: "hidden md:table-cell" }
        ];
    const statuses = Object.values(Status);
    const status = statuses.includes(param.status) ? param.status : undefined;
    const orderBy = columns.map((column) => (column.value))
        .includes(param.orderBy) ? { [param.orderBy]: "asc" } : undefined;
    const issues = await prisma.issue.findMany(
        {
            where: { status },
            orderBy: orderBy
        },

    );

    return (
        <div >
            <IssueActions />
            <Suspense fallback={<p>Loading Issues...</p>}>
                <Table.Root variant="surface" className="max-w-3xl" >
                    <Table.Header>
                        <Table.Row>
                            {columns.map((column) => (
                                <Table.ColumnHeaderCell key={column.value} className={column.classname}>
                                    <NextLink href={{
                                        query: { ...param, orderBy: column.value }
                                    }}>{column.label}</NextLink>
                                    {column.value === param.orderBy && <ArrowUpIcon className='inline' />}
                                </Table.ColumnHeaderCell>

                            ))}

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {issues.map((issue) => (
                            <Table.Row key={issue.id}>
                                <Table.Cell>
                                    <Link href={`/issues/${issue.id}`}> {issue.title}</Link>

                                    <div className="block md:hidden"><IssueStatusBadge status={issue.status} /></div>
                                </Table.Cell>
                                <Table.Cell className="hidden md:table-cell"><IssueStatusBadge status={issue.status} /></Table.Cell>
                                <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Suspense >
        </div>

    )
}

export const dynamic = 'force-dynamic';
export default IssuesPage