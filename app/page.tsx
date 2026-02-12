import IssueChart from "./IssueChart";
import IssueSummery from "./IssueSummery";
import LatestIssues from "./LatestIssues";
import { prisma } from "./lib/prisma";

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
  return <IssueChart open={open} In_Progress={InProgress} closed={closed} />;
}
