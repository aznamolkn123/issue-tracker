"use client";
import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
    open: number;
    In_Progress: number;
    closed: number;
}
const IssueChart = ({ open, In_Progress, closed }: Props) => {
    const data = [
        { label: "Open", value: open },
        { label: "In Progress", value: In_Progress },
        { label: "Closed", value: closed },
    ];

    return (
        <Card>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Bar
                        dataKey="value"
                        barSize={60}
                        style={{ fill: "var(--accent-9)" }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default IssueChart;
