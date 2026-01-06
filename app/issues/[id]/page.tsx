import { IssueStatusBadge } from '../../components'
import { Card, Flex, Heading } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { prisma } from '../../lib/prisma'
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