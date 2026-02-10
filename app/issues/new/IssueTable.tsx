import React from 'react'
import { Table, } from "@radix-ui/themes";
import { prisma } from "../../lib/prisma";
import Link from "@/app/components/Link";
import NextLink from "next/link";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import { Status } from '@/app/generated/prisma/edge';
import { Issue } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';

const IssueTable = async ({ searchParams }: { searchParams: Promise<{ status: Status, orderBy: keyof Issue }> }) => {
    const params = await searchParams;
    const statuses = Object.values(Status);
    const status = statuses.includes(params.status) ? params.status : undefined;
    const issues = await prisma.issue.findMany(
        {
            where: { status },
        }
    );

    const columns: {
        label: string;
        value: keyof Issue;
        classname?: string
    }[] = [
            { label: "Issue", value: "title" },
            { label: "Status", value: "status", classname: "hidden md:table-cell" },
            { label: "Created At", value: "createdAt", classname: "hidden md:table-cell" }
        ]
    return (
        <div>
            <Table.Root variant="surface" className="max-w-3xl" >
                <Table.Header>
                    <Table.Row>
                        {columns.map((column) => (
                            <Table.ColumnHeaderCell key={column.value}>
                                <NextLink href={{
                                    query: { ...params, orderBy: column.value }
                                }}>{column.label}</NextLink>
                                {column.value === params.orderBy && <ArrowUpIcon className='inline' />}
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
        </div>
    )
}

export default IssueTable