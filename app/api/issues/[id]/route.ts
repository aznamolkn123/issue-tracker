import { prisma } from "@/app/lib/prisma";
import { IssueSchema } from "@/app/validationScemas";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json()
    const validation = IssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json({ error: validation.error.format() }, { status: 400 });

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    })
    if (!issue)

        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    const updatedIssue = await prisma.issue.update({
        where: { id: parseInt(id) },
        data: {
            title: body.title,
            description: body.description
        }
    })
    return NextResponse.json(updatedIssue)

}