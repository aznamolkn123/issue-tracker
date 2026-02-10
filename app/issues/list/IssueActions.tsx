import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'
import { Status } from '@prisma/client'
import { Issue } from '@/app/generated/prisma/edge'

const IssueActions = () => {
    return (
        <Flex mb="5" justify="between">
            <IssueStatusFilter />
            <Button >
                <Link href="/issues/new">New Issue Page</Link>
            </Button>
        </Flex>
    )
}

export default IssueActions