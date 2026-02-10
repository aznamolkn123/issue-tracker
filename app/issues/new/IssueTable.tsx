import React from 'react'
import { Table, } from "@radix-ui/themes";
import { prisma } from "../../lib/prisma";
import Link from "@/app/components/Link";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import { Status } from '@/app/generated/prisma/edge';

const IssueTable = async ({ searchParams }: { searchParams: Promise<{ status: Status }> }) => {
    const params = await searchParams;
    const statuses = Object.values(Status);
    const status = statuses.includes(params.status) ? params.status : undefined;
    const issues = await prisma.issue.findMany(
        {
            where: { status },
        }
    );

    return (
        <div>
            <Table.Root variant="surface" className="max-w-3xl" >
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">Created At</Table.ColumnHeaderCell>
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
        </div>
    )
}

export default IssueTable