import { Box, Skeleton, Text } from "@radix-ui/themes";

export default function LoadingIssueDetailPage() {
    return (
        <Box className="max-w-3xl">
            <Skeleton height="2rem" width="50%" />
            <div className="flex gap-3 my-2">
                <Skeleton width="40px" />
                <Skeleton width="100px" />
            </div>
            <Skeleton mt="4" height="200px" />
        </Box>
    );
}