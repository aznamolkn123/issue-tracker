export const dynamic = "force-dynamic";
import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummery from "./IssueSummery";
import { prisma } from "./lib/prisma";
import { Metadata } from "next";
import LatestIssues from "./LatestIssues";


export default async function Home() {

  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const InProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="6">
      <Flex direction="column" gap="5">
        <IssueSummery open={open} In_Progress={InProgress} closed={closed} />
        <IssueChart open={open} In_Progress={InProgress} closed={closed} />
      </Flex>
      <LatestIssues />

    </Grid>
  )
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summery of project issue"
}
