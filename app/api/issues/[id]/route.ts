export const dynamic = "force-dynamic";
import authOptions from "@/app/auth/authOptions";
import { prisma } from "@/app/lib/prisma";
import { patchIssueSchema } from "@/app/validationScemas";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //     return NextResponse.json({}, { status: 401 });
    // }
    const { id } = await params;
    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(
            { error: validation.error.format() },
            { status: 400 },
        );

    const { assignedToUserId, title, description } = body;

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: { id: assignedToUserId },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid User" }, { status: 400 });
        }
    }
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });

    if (!issue)
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title,
            description,
            assignedToUserId: assignedToUserId || null,

        }
    })
    return NextResponse.json(updatedIssue)

}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({}, { status: 401 });
    }
    const { id } = await params;

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });
    if (!issue)
        return NextResponse.json({ error: "Issue not found " }, { status: 404 });
    await prisma.issue.delete({
        where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: "Issue deleted successfully" });
}
