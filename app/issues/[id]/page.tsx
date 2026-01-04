import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { prisma } from '../../lib/prisma'
import { notFound } from 'next/navigation'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'

interface Props {
    params: Promise<{ id: string }>
}
const IssuesDetailPage = async ({ params }: Props) => {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    })
    if (!issue)
        notFound();
    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" my="2">
                <IssueStatusBadge status={issue.status} />
                <p>{issue.createdAt.toDateString()}</p>
            </Flex>
            <Card className="prose mt-4">
                <ReactMarkdown>{issue.description}</ReactMarkdown>

            </Card>
        </div>
    )
}

export default IssuesDetailPage